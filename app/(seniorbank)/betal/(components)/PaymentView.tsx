"use client";

import { useState } from "react";
import PaymentFirstStep from "./steps/PaymentStep1";
import PaymentSecondStep from "./steps/PaymentStep2";
import PaymentThirdStep from "./steps/PaymentStep3";
import PaymentConfirmationStep from "./steps/PaymentStepConfirmation";
import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import { PublicBankAccountDetails } from "@/model/domain/payment/BankAccount";
import { ProgressBar } from "@/ui/organisms/ProgressBar";
import { PaymentFormData } from "../types";
import { createTransaction } from "@/actions/bankAccount";

export default function PaymentForm({
  accounts,
  approvedPeers,
}: {
  accounts: JsonBankAccount[];
  approvedPeers: PublicBankAccountDetails[];
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<PaymentFormData>>({});

  const onGoBack = () => {
    setStep(step - 1);
  };

  async function onStepCompleted(newData: Partial<PaymentFormData>) {
    const data = { ...formData, ...newData };

    if (step === 3) {
      await createTransaction(
        data.fromAccountId!,
        data.toAccountId!,
        data.amount!,
      );
    }

    setFormData(data);
    setStep((step) => step + 1);
  }

  let component;

  if (step === 1) {
    component = (
      <PaymentFirstStep
        onStepCompleted={onStepCompleted}
        accounts={accounts}
        formData={formData}
      />
    );
  } else if (step === 2) {
    component = (
      <PaymentSecondStep
        onStepCompleted={onStepCompleted}
        approvedPeers={approvedPeers}
        accounts={accounts}
        formData={formData}
        onGoBack={onGoBack}
      />
    );
  } else if (step === 3) {
    component = (
      <PaymentThirdStep
        formData={formData}
        onGoBack={onGoBack}
        peerAccounts={approvedPeers}
        accounts={accounts}
        onStepCompleted={onStepCompleted}
      />
    );
  } else if (step === 4) {
    component = (
      <PaymentConfirmationStep
        formData={formData}
        peerAccounts={approvedPeers}
        accounts={accounts}
        onGoBack={onGoBack}
        onStepCompleted={onStepCompleted}
      />
    );
  } else {
    setStep(1);
  }

  return (
    <>
      <ProgressBar totalSteps={4} currentStep={step} />
      {component}
    </>
  );
}
