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
import toast from "react-hot-toast";

export default function PaymentForm({
  accounts,
  approvedPeers,
}: {
  accounts: JsonBankAccount[];
  approvedPeers: PublicBankAccountDetails[];
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<PaymentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onGoBack = () => {
    setStep(step - 1);
  };

  async function onStepCompleted(newData: Partial<PaymentFormData>) {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);

    if (step === 3) {
      setIsSubmitting(true);
      try {
        const result = await createTransaction(
          updatedData.fromAccountId!,
          updatedData.toAccountId!,
          updatedData.amount!,
        );
        setStep(step + 1);

        if (result.contactNotified) {
          toast.success(
            "Betalingen er gjennomført. Trygghetskontrakten er varslet.",
            {
              duration: 4000,
              position: "top-right",
              style: {
                background: "#D3D3EA",
                color: "#000",
                fontSize: "16px",
                fontWeight: "bold",
              },
            },
          );
        } else {
          toast.success("Betalingen er gjennomført.", {
            duration: 4000,
            position: "top-right",
            style: {
              background: "#D3D3EA",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
            },
          });
        }
      } catch (error) {
        toast.error("Overføringen mislyktes. Vennligst prøv igjen senere.");
        console.error("Transaction failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(step + 1);
    }
  }

  let component;
  switch (step) {
    case 1:
      component = (
        <PaymentFirstStep
          onStepCompleted={onStepCompleted}
          accounts={accounts}
          formData={formData}
        />
      );
      break;
    case 2:
      component = (
        <PaymentSecondStep
          onStepCompleted={onStepCompleted}
          approvedPeers={approvedPeers}
          accounts={accounts}
          formData={formData}
          onGoBack={onGoBack}
        />
      );
      break;
    case 3:
      component = (
        <PaymentThirdStep
          formData={formData}
          onGoBack={onGoBack}
          peerAccounts={approvedPeers}
          accounts={accounts}
          onStepCompleted={onStepCompleted}
          isSubmitting={isSubmitting}
        />
      );
      break;
    case 4:
      component = (
        <PaymentConfirmationStep
          formData={formData}
          peerAccounts={approvedPeers}
          accounts={accounts}
          onGoBack={onGoBack}
          onStepCompleted={onStepCompleted}
        />
      );
      break;
    default:
      component = (
        <PaymentFirstStep
          onStepCompleted={onStepCompleted}
          accounts={accounts}
          formData={formData}
        />
      );
  }

  return (
    <>
      <ProgressBar totalSteps={4} currentStep={step} />
      {component}
    </>
  );
}
