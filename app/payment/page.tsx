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
    amount: ""
  });  
  const handleNext = () => {
    if (step === 2){
      if(formData.comment.trim() ==="" ){
        toast.error("Fyll ut kommentarer")
        return;
      }
      if(formData.amount.trim() ===""){
        toast.error("Fyll ut beløp")
        return;
      }
    };
    setStep(step+1);
  }
  const handleGoBack = () => {
    setStep(step-1);
  }
  const handleReset = () => {
    setStep(1);
  }
  const handleSubmit = () => {
    //TODO: Temp console log
    console.log(formData);
    toast.success("Kommentar er sendt inn")
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (id === "amount") {
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value, 
        }));
      } else {
        toast.error("Beløpet må være et tall!");
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  let stepComponent; 

  if (step === 1) {
    stepComponent = <PaymentFirstStep onClick={handleNext}/>;
  }

  if (step === 2) {
    stepComponent = <PaymentSecondStep formData={formData} 
    handleNext={handleNext}  
    handleChange={handleChange} 
    onGoBack={handleGoBack}/>
  }
  if (step === 3) {
    stepComponent = <PaymentThirdStep onClick={handleSubmit} onGoBack={handleGoBack}/>
  }
  if (step === 4) {
    stepComponent = <PaymentFourtStep onClick={handleReset}/>
  }
  return (
    <section>
      {stepComponent}
    </section>

  );
}
