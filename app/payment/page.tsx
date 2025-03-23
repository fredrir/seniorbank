"use client";
import { useState } from "react";
import PaymentFirstStep from "@/components/payment/PaymentFirstStep";
import PaymentSecondStep from "@/components/payment/PaymentSecondStep";
import PaymentThirdStep from "@/components/payment/PaymentThirdStep";
import PaymentFourtStep from "@/components/payment/PaymentFourthStep";
import toast from "react-hot-toast";

export default function Payment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    comment: "",
    amount: "",
    toAccount: "",
    fromAccount: ""
  });  

  const accountOptions = [
    {
      title: "Sparekonto",
      amount: 830726,
    },
    {
      title: "Barnebarn",
      amount: 34835,
    },
    {
      title: "Russetid",
      amount: 10835,
    },
  ];

  const handleNext = () => {
    const accountNumber = formData.toAccount.trim();
    if (step === 2){
      if(formData.comment.trim() ==="" ){
        toast.error("Fyll inn kommentarer")
        return;
      }
      if(formData.amount.trim() ===""){
        toast.error("Fyll inn beløp")
        return;
      }
      if(formData.toAccount.trim() ===""){
        toast.error("Fyll inn kontonummer")
        return;
      }
      if (accountNumber.length < 8 || accountNumber.length > 18) {
        toast.error("Kontonummer må være mellom 8 og 18 sifre");
        return;
      }
    };
    setStep(step+1);
  };

  const handleGoBack = () => {
    setStep(step-1);
  };

  const handleReset = () => {
    setStep(1);
    formData.comment = "",
    formData.amount = "",
    formData.toAccount = "",
    formData.fromAccount = ""
  };

  const handleSubmit = () => {
    //TODO: Temp console log
    console.log(formData);
    toast.success("Kommentar er sendt inn")
    setStep(step+1);
  };

  const handleSelectAccount = (account: string) => {
    console.log("Selected account:", account);
    setFormData((prevData) => ({
      ...prevData,
      fromAccount: account,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (id === "amount") { //TODO: Add restrictions so that the amount cannot be larger than the amount on the account
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value, 
        }));
      } else {
        toast.error("Beløpet må være et tall!");
      }
    } else if (id === "toAccount") {
      if (value === "" || /^[0-9]{0,18}$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value, 
        }));
      } else if (value.length < 8 || value.length > 18){
        toast.error("Kontonummer må være et tall mellom 8 til 18");
      }
      else {
        toast.error("Kontonummer må være et tall mellom 8 til 18");
      }
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  let stepComponent; 

  if (step === 1) {
    stepComponent = <PaymentFirstStep onSelectAccount={handleSelectAccount} onClick={handleNext}  accountOptions={accountOptions} />;
  };

  if (step === 2) {
    stepComponent = <PaymentSecondStep formData={formData} 
    handleNext={handleNext}  
    handleChange={handleChange} 
    onGoBack={handleGoBack}/>
  }
  if (step === 3) {
    stepComponent = <PaymentThirdStep  formData={formData} onClick={handleSubmit} onGoBack={handleGoBack}/>
  }
  if (step === 4) {
    stepComponent = <PaymentFourtStep formData={formData} onClick={handleReset}/>
  }
  return (
    <section>
      {stepComponent}
    </section>

  );
}
