"use client";
import { useEffect, useState } from "react";
import PaymentFirstStep from "@/components/payment/PaymentFirstStep";
import PaymentSecondStep from "@/components/payment/PaymentSecondStep";
import PaymentThirdStep from "@/components/payment/PaymentThirdStep";
import PaymentFourthStep from "@/components/payment/PaymentFourthStep";
import toast from "react-hot-toast";
import PaymentFifthStep from "@/components/payment/PaymentFifthStep";
import { useSession } from "next-auth/react";



export default function Payment() {
  const [step, setStep] = useState(1);
  const [isHard, setIsHard] = useState(false);
  const [onSelectFields, setOnSelectFields] = useState(false);

  const [formData, setFormData] = useState({
    comment: "",
    amount: "",
    toAccount: "",
    fromAccount: "",
    testnum: 0,
  });
  const { data: session } = useSession(); // Get session data
  useEffect(() => {
    if (session?.user?.difficulty) {
      setIsHard(session.user.difficulty === "HARD");
    }
  }, [session]);

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

  const approvedTransactionOptions = [
    {
      accountNumber: 18368237294,
    },
    {
      accountNumber: 48394724957,
    },
    {
      accountNumber: 28459237593,
    },
  ];
  const approvedAccountOptions = [ //TODO connect to database
    {
      title: "Strømleverandør",
      accountNumber: 18368237294,
    },
    {
      title: "Husleie",
      accountNumber: 48394724957,
    },
    {
      title: "Mobilabonement",
      accountNumber: 28459237593,
    },
  ];


  const handleNext = () => {
    const accountNumber = formData.toAccount.trim();
    if (step === 2 && isHard) {
      if (formData.amount.trim() === "") {
        toast.error("Fyll inn beløp");
        return;
      }
      if (formData.toAccount.trim() === "") {
        toast.error("Fyll inn kontonummer");
        return;
      }
      if (accountNumber.length < 8 || accountNumber.length > 18) {
        toast.error("Kontonummer må være mellom 8 og 18 sifre");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const handleGoToHomepage = () => {
    window.location.href = "/";
  };

  const handleSubmit = () => {
    //TODO: Temp console log
    console.log(formData);
    toast.success("Betalingen er gjennomført.");
    setStep(step + 1);
  };

 
  const handleSelectFromAccount = (account: string) => { // Setter account som FromAccount i formData. Account må være en string. Når en knapp har denne
    console.log("Selected account:", account);
    setFormData((prevData) => ({
      ...prevData,
      fromAccount: account,
    }));
  };

  const handleSelectToAccount = (account: string) => { // Setter account som toAccount i formData. Account må være en string. Når en knapp har denne
    console.log("Selected account:", account); //TODO: Er denne jeg må bruke
    setFormData((prevData) => ({
      ...prevData,
      toAccount: account,
    }));
  };

  const handleAcountNumber = (accountNumber: number) => { // Setter account som toAccount i formData. Account må være en string. Når en knapp har denne
    console.log("Selected account:", accountNumber); //TODO: Er denne jeg må bruke
    setFormData((prevData) => ({
      ...prevData,
      testnum: accountNumber,
    }));
  };

  useEffect(() => {
    const isValid =
      formData.fromAccount.length > 7 &&
      formData.fromAccount.length < 19 &&
      formData.toAccount.trim().length > 0 &&
      formData.amount.trim().length > 0;
    setOnSelectFields(isValid);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (id === "amount") {
      //TODO: Add restrictions so that the amount cannot be larger than the amount on the account
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      } else {
        toast.error("Beløpet må være et tall.");
      }
    } else if (id === "toAccount") {
      if (value === "" || /^[0-9]{0,18}$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      } else if (value.length < 8 || value.length > 18) {
        toast.error("Kontonummer må være et tall mellom 8 til 18.");
      } else {
        toast.error("Kontonummer må være et tall mellom 8 til 18.");
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
    stepComponent = (
      <PaymentFirstStep
        onSelectAccount={handleSelectFromAccount}
        onClick={handleNext}
        accountOptions={accountOptions}
        selectedAccount={formData.fromAccount}
        isHard={isHard}
      />
    );
  }

  if (step === 2) {
    stepComponent = (
      <PaymentSecondStep
        formData={formData}
        handleChange={handleChange}
        onGoBack={handleGoBack}
        onSelectAccount={handleSelectToAccount}
        onClick={handleNext}
        approvedAccountOptions={approvedAccountOptions}
        // approvedTransactionOptions={approvedTransactionOptions}
        selectedAccount={formData.toAccount}
        onSelectFields={onSelectFields}
        isHard={isHard}
      />
    );
  }
  if (step === 3) {
    stepComponent = (
      <PaymentThirdStep
        formData={formData}
        handleSubmit={handleSubmit}
        onGoBack={handleGoBack}
        handleChange={handleChange}
        onClick={handleNext}
        approvedAccountOptions={approvedAccountOptions}
        selectedAmount={formData.amount}
        isHard={isHard}
      />
    );
  }
  if (step === 4) {
    stepComponent = (
      <PaymentFourthStep
        formData={formData}
        onClick={handleSubmit}
        onGoBack={handleGoBack}
        onGoToHomepage={handleGoToHomepage}
        isHard={isHard}
      />
    );
  }
  if (step === 5) {
    stepComponent = (
      <PaymentFifthStep formData={formData} onClick={handleGoToHomepage} />
    );
  }
  return (
    <section>
      <h1 className="mt-5 text-4xl font-bold text-white">Betal</h1>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width={100}
        height={100}
        className="absolute left-0 top-0 z-[-1] h-[500px] w-full text-[#015aa4]"
      >
        <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
      </svg>
      {stepComponent}
    </section>
  );
}
