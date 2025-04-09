"use client";

import { useEffect, useState } from "react";
import PaymentFirstStep from "@/app/(seniorbank)/payment/(components)/PaymentFirstStep";
import PaymentSecondStep from "@/app/(seniorbank)/payment/(components)/PaymentSecondStep";
import PaymentThirdStep from "@/app/(seniorbank)/payment/(components)/PaymentThirdStep";
import PaymentConfirmationStep from "@/app/(seniorbank)/payment/(components)/PaymentConfirmationStep";
import toast from "react-hot-toast";
import Heading from "@/ui/molecules/Heading";
import { redirect } from "next/navigation";

export default function Payment() {
  const [formData, setFormData] = useState({
    comment: "",
    amount: "",
    toAccount: "",
    fromAccount: "",
  });

  const defaultStep = formData.toAccount === "" ? 1 : parseInt(new URLSearchParams(window.location.search).get("step") || "1") ?? 1;
  const [step, setStep] = useState(defaultStep);

  useEffect(() => {
    window.history.pushState({}, "", `?step=${step}`);
  }, [step]);
  
  useEffect(() => {
    const handlePopState = () => {
      const urlStep = parseInt(new URLSearchParams(window.location.search).get("step") || "1");
      setStep(urlStep);
    };
  
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
    if (step === 2) {
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

  const handleSubmit = () => {
    toast.success("Betalingen er gjennomført.");
    setStep(step + 1);
  };

  const handleSelectAccount = (account: string) => {
    setFormData((prevData) => ({
      ...prevData,
      fromAccount: account,
    }));
    setStep(2);
  };

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
        onSelectAccount={handleSelectAccount}
        onClick={handleNext}
        accountOptions={accountOptions}
      />
    );
  }

  if (step === 2) {
    stepComponent = (
      <PaymentSecondStep
        formData={formData}
        handleNext={handleNext}
        handleChange={handleChange}
        onGoBack={handleGoBack}
      />
    );
  }
  if (step === 3) {
    stepComponent = (
      <PaymentThirdStep
        formData={formData}
        onClick={handleSubmit}
        onGoBack={handleGoBack}
      />
    );
  }
  if (step === 4) {
    stepComponent = (
      <PaymentConfirmationStep formData={formData} onClick={() => redirect("/")} />
    );
  }
  return (
    <section>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width={100}
        height={100}
        className="absolute left-0 top-0 z-[-1] h-[500px] w-full text-[#015aa4]"
      >
        <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
      </svg>

      <Heading title="Betal faktura" className="mb-16"/>

      {stepComponent}
    </section>
  );
}
