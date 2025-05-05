"use client";

import { BanknoteIcon } from "lucide-react";
import { Textarea } from "@/ui/atoms/Textarea";
import { Input } from "@/ui/atoms/Input";
import ApprovedAccountView from "../ApprovedAccountView";
import Combobox from "@/ui/atoms/Combobox";
import { PaymentFormData } from "../../types";
import { PublicBankAccountDetails } from "@/model/domain/payment/BankAccount";
import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import { useState } from "react";
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
  const canProceed = Boolean(stepData.toAccountId) && isAmountValid;
  const problem = !stepData.toAccountId
    ? "Du må velge en mottaker"
    : !isAmountValid
      ? "Du må angi et gyldig beløp"
      : undefined;

  return (
    <section>
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <h1 className="pl-10 text-3xl font-bold text-seniorBankDarkBlue">
          Velg mottaker
        </h1>
        <div className="m-10 grid grid-cols-1 justify-between gap-1 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
          {isHard ? (
            <>
              <p>Fra konto: </p>
              <div className="flex h-20 items-center rounded-md border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10 ps-3 !text-2xl">
                <p>{formData.fromAccountId}</p>
              </div>
              <p>Til konto: </p>
              <Combobox
                onChange={(toAccountId) =>
                  setStepData((data) => ({ ...data, toAccountId }))
                }
                isInputInvalid={(input) =>
                  input.length > 6 && input.length < 12
                }
                defaultOptions={approvedPeers.map((peer) => ({
                  value: peer.id,
                  label: `${peer.name} - ${peer.id}`,
                }))}
                inputPlaceholder="Skriv inn kontonummer her ..."
              />

              <div className="relative">
                <p>Beløp</p>
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
                  className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10 !text-2xl placeholder:text-2xl"
                />
                <BanknoteIcon className="absolute right-2 top-3/4 size-8 -translate-y-1/2 transform text-seniorBankDarkBlue" />
              </div>
              <p>Kommentar: </p>
              <Textarea
                id="comment"
                value={stepData.comment}
                onChange={({ target: { value: comment } }) =>
                  setStepData((data) => ({ ...data, comment }))
                }
                placeholder="Skriv inn kommentar her ... "
                className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pt-4 !text-2xl placeholder:text-2xl"
              />
            </>
          ) : (
            <>
              <section>
                <div className="grid grid-cols-1 justify-between gap-1 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
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
            </>
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
