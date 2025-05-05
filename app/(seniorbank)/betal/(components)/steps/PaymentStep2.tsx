"use client";

import { BanknoteIcon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/ui/atoms/Textarea";
import { Input } from "@/ui/atoms/Input";
import ApprovedAccountView from "../ApprovedAccountView";
import Combobox from "@/ui/atoms/Combobox";
import type { PaymentFormData } from "../../types";
import type { PublicBankAccountDetails } from "@/model/domain/payment/BankAccount";
import type { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import { PaymentFormNavbar } from "../PaymentFormButton";

interface PaymentSecondStepProps {
  onStepCompleted: (data: {
    toAccountId: string;
    amount: number;
    comment: string;
  }) => void;
  approvedPeers: PublicBankAccountDetails[];
  accounts: JsonBankAccount[];
  formData: Partial<PaymentFormData>;
  onGoBack: () => void;
}

const PaymentSecondStep = ({
  onStepCompleted,
  approvedPeers,
  formData,
  onGoBack,
}: PaymentSecondStepProps) => {
  const isHard = true;

  const [stepData, setStepData] = useState<{
    toAccountId?: string;
    amount: string;
    comment: string;
  }>({
    amount: formData.amount?.toString() ?? "",
    comment: formData.comment ?? "",
    toAccountId: formData.toAccountId,
  });

  // Validate if we can proceed to the next step
  const isAmountValid =
    !isNaN(Number(stepData.amount)) && Number(stepData.amount) > 0;

  // Check if the amount is a valid number and greater than zero
  const isValidAmount = (amount: string) => {
    const parsedAmount = parseFloat(amount);
    return !isNaN(parsedAmount) && parsedAmount > 0;
  };

  const isNotSameAccount = (accountId: string) => {
    return accountId === formData.fromAccountId;
  };

  const canProceed = Boolean(stepData.toAccountId) && isAmountValid;
  const problem = !stepData.toAccountId
    ? "Du må velge en mottaker"
    : !isAmountValid
      ? "Du må angi et gyldig beløp"
      : isNotSameAccount(stepData.toAccountId!)
        ? "Du kan ikke betale til deg selv"
        : !isValidAmount(stepData.amount)
          ? "Beløpet må være større enn 0"
          : undefined;

  return (
    <section
      aria-labelledby="payment-step-heading"
      className="mx-auto w-full max-w-4xl"
    >
      <div>
        <h1
          id="payment-step-heading"
          className="pl-10 pt-6 text-3xl font-bold text-seniorBankDarkBlue"
        >
          Velg mottaker
        </h1>
        <div className="m-10 grid grid-cols-1 gap-6 rounded-lg text-2xl font-bold text-seniorBankDarkBlue">
          {isHard ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="w-full space-y-6">
                <div className="space-y-2">
                  <label htmlFor="from-account" className="block">
                    Fra konto:
                  </label>
                  <div
                    id="from-account"
                    className="flex h-20 items-center rounded-md border-2 border-seniorBankDarkBlue bg-seniorbankWhite px-4 !text-2xl"
                    aria-readonly="true"
                  >
                    <p>{formData.fromAccountId}</p>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <label htmlFor="to-account" className="block">
                    Til konto:
                  </label>
                  <Combobox
                    onChange={(toAccountId) =>
                      setStepData((data) => ({ ...data, toAccountId }))
                    }
                    isInputInvalid={(input) =>
                      input.length > 6 && input.length < 12
                    }
                    defaultOptions={approvedPeers.map((peer) => ({
                      value: peer.id,
                      label: `${peer.id} - ${peer.name} - ${peer.balance.toLocaleString(
                        "nb-NO",
                        {
                          style: "currency",
                          currency: "NOK",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        },
                      )}`,
                    }))}
                    inputPlaceholder="Skriv inn kontonummer her ..."
                    aria-required="true"
                    aria-invalid={!stepData.toAccountId}
                    aria-describedby={
                      !stepData.toAccountId ? "to-account-error" : undefined
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="block">
                    Beløp:
                  </label>
                  <div className="relative">
                    <Input
                      id="amount"
                      value={stepData.amount}
                      onChange={({ target: { value: amount } }) =>
                        setStepData((data) => ({ ...data, amount }))
                      }
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      placeholder="Skriv inn beløp her ..."
                      name="paymentAmount"
                      className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pl-4 pr-14 !text-2xl placeholder:text-2xl focus:border-seniorBankDarkBlue focus:ring-2 focus:ring-seniorBankDarkBlue"
                      aria-required="true"
                      aria-invalid={!isAmountValid && stepData.amount !== ""}
                      aria-describedby={
                        !isAmountValid && stepData.amount !== ""
                          ? "amount-error"
                          : undefined
                      }
                    />
                    <BanknoteIcon
                      className="pointer-events-none absolute right-4 top-1/2 size-8 -translate-y-1/2 transform text-seniorBankDarkBlue"
                      aria-hidden="true"
                    />
                  </div>
                  {!isAmountValid && stepData.amount !== "" && (
                    <p
                      id="amount-error"
                      className="mt-1 text-lg text-red-600"
                      role="alert"
                    >
                      Du må angi et gyldig beløp
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="comment" className="block">
                    Kommentar:
                  </label>
                  <Textarea
                    id="comment"
                    value={stepData.comment}
                    onChange={({ target: { value: comment } }) =>
                      setStepData((data) => ({ ...data, comment }))
                    }
                    placeholder="Skriv inn kommentar her ... "
                    className="h-20 resize-none border-2 border-seniorBankDarkBlue bg-seniorbankWhite px-4 pt-4 !text-2xl placeholder:text-2xl focus:border-seniorBankDarkBlue focus:ring-2 focus:ring-seniorBankDarkBlue"
                  />
                </div>
              </div>
            </form>
          ) : (
            <section aria-label="Velg mottaker fra godkjente kontoer">
              <div className="grid grid-cols-1 gap-4 rounded-lg">
                {approvedPeers.map((option) => (
                  <ApprovedAccountView
                    key={option.id}
                    title={option.name}
                    accountNumber={option.id}
                    onSelect={() =>
                      setStepData((data) => ({
                        ...data,
                        toAccountId: option.id,
                      }))
                    }
                    isSelected={stepData.toAccountId === option.id}
                  />
                ))}
              </div>
            </section>
          )}

          <PaymentFormNavbar
            onGoBack={onGoBack}
            problem={problem}
            onGoForward={() => {
              if (!canProceed) {
                return;
              }
              onStepCompleted({
                amount: Number(stepData.amount),
                comment: stepData.comment,
                toAccountId: stepData.toAccountId!,
              });
            }}
          >
            Neste
          </PaymentFormNavbar>
        </div>
      </div>
    </section>
  );
};

export default PaymentSecondStep;
