"use client";

import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import TransferForm, { TransferFormData } from "./TransferForm";
import { useState } from "react";
import TransferPreview from "./TransferPreview";
import { createTransaction } from "@/actions/bankAccount";
import TransferConfirmation from "./TransferConfirmation";
import toast from "react-hot-toast";

function showToast(message: string) {
  toast.success(message, {
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

export function TransferPage({ accounts }: { accounts: JsonBankAccount[] }) {
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
      <TransferPreview
        toAccount={toAccount}
        fromAccount={fromAccount}
        amount={formData.amount}
        handleCancel={() => setFormData(null)}
        handleConfirm={async () => {
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
        }}
      />
    );
  }

  return <TransferForm accounts={accounts} onSubmit={setFormData} />;
}
