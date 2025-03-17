"use client";
import { useState } from "react";
import PaymentFirstStep from "@/components/payment/PaymentFirstStep";
import PaymentSecondStep from "@/components/payment/PaymentSecondStep";
import PaymentThirdStep from "@/components/payment/PaymentThirdStep";
import PaymentFourtStep from "@/components/payment/PaymentFourthStep";

export default function Payment() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step+1);
  }
  const handleGoBack = () => {
    setStep(step-1);
  }
  const handleReset = () => {
    setStep(1);
  }

  let stepComponent; 

  if (step === 1) {
    stepComponent = <PaymentFirstStep onClick={handleNext}/>;
  }

  if (step === 2) {
    stepComponent = <PaymentSecondStep onClick={handleNext} onGoBack={handleGoBack}/>
  }
  if (step === 3) {
    stepComponent = <PaymentThirdStep onClick={handleNext} onGoBack={handleGoBack}/>
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
