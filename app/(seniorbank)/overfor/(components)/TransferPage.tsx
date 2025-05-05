"use client";

import React from "react";
import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import TransferForm, { TransferFormData } from "./TransferForm";
import { useState } from "react";
import TransferPreview from "./TransferPreview";
import { createTransaction } from "@/actions/bankAccount";
import TransferConfirmation from "./TransferConfirmation";
import toast from "react-hot-toast";
import LoadingOverlay from "@/app/(authentication)/register/(components)/LoadingOverlay";

function showToast(message: string, error: boolean = false) {
  const toastStyle = {
    background: error ? "#F8D7DA" : "#D3D3EA",
    color: "#000",
    fontSize: "16px",
    fontWeight: "bold",
  };

  if (error) {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
      style: toastStyle,
    });
  } else {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
      style: toastStyle,
    });
  }
}

export function TransferPage({ accounts }: { accounts: JsonBankAccount[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TransferFormData | null>(null);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof createTransaction>
  > | null>(null);

  if (result) {
    return <TransferConfirmation contactNotified={result.contactNotified} />;
  }

  if (formData) {
    const fromAccount = accounts.find(
      (account) => account.id === formData.fromAccountId,
    )!;
    const toAccount = accounts.find(
      (account) => account.id === formData.toAccountId,
    )!;

    return (
      <>
        <LoadingOverlay
          isVisible={isSubmitting}
          message="Vennligst vent mens overføringen blir prosessert"
        />
        <TransferPreview
          toAccount={toAccount}
          fromAccount={fromAccount}
          amount={formData.amount}
          handleCancel={() => setFormData(null)}
          handleConfirm={async () => {
            setIsSubmitting(true);

            try {
              const result = await createTransaction(
                fromAccount.id,
                toAccount.id,
                formData.amount,
              );

              showToast(
                result.contactNotified
                  ? "Overføringen er gjennomført. Trygghetskontrakten er varslet."
                  : "Overføringen er gjennomført.",
              );

              setResult(result);
              setIsSubmitting(false);
            } catch (error) {
              setIsSubmitting(false);
              showToast(
                "Overføringen mislyktes. Vennligst prøv igjen senere.",
                true,
              );
              console.error("Transaction failed:", error);
            }
          }}
        />
      </>
    );
  }

  return <TransferForm accounts={accounts} onSubmit={setFormData} />;
}
