"use client";

import type React from "react";

import { Button } from "@/ui/atoms/Button";
import { BanknoteIcon } from "lucide-react";
import { Textarea } from "@/ui/atoms/Textarea";
import { Input } from "@/ui/atoms/Input";
import ApprovedAccountView from "../ApprovedAccountView";
import { ProgressBar } from "@/ui/organisms/ProgressBar";
import Combobox from "../../../../../ui/atoms/Combobox";
import { useRef, useEffect } from "react";

interface PaymentSecondStepProps {
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
  };
  onGoBack: () => void;
  onhandleAccountNumber: (accountNumber: string) => void;
  onClick: () => void;
  onSelectFields: boolean;
  onSelectAccount: (account: string) => void;
  isInputInvalid: (inputValue: string) => string | boolean;
  approvedAccountOptions: { title: string; accountNumber: string }[];
  transactionOptions: { accountNumber: string }[];
  selectedAccount: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isHard: boolean;
}

const approvedAccounts = [
  {
    value: "1836.82.37294",
    label: "1836.82.37294",
  },
  {
    value: "4839.47.24957",
    label: "4839.47.24957",
  },
  {
    value: "2845.92.37593",
    label: "2845.92.37593",
  },
];

const PaymentSecondStep = ({
  formData,
  handleChange,
  onSelectFields,
  onGoBack,
  isHard,
  onClick,
  isInputInvalid,
  onSelectAccount,
  approvedAccountOptions,
  selectedAccount,
}: PaymentSecondStepProps) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus the first input when component mounts
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <section aria-labelledby="step-heading">
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <ProgressBar totalSteps={isHard ? 3 : 4} currentStep={2} />
        <h1
          id="step-heading"
          className="pl-10 text-3xl font-bold text-seniorBankDarkBlue"
        >
          {isHard ? "Trygghetskontakt vil bli varslet" : "Velg mottaker"}
        </h1>
        <div className="m-10 grid grid-cols-1 justify-between gap-1 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
          {isHard ? (
            <>
              <div className="grid gap-4">
                <label
                  htmlFor="from-account"
                  className="text-seniorBankDarkBlue"
                >
                  Fra konto:{" "}
                </label>
                <div
                  id="from-account"
                  className="flex h-20 items-center rounded-md border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10 ps-3 !text-2xl"
                  aria-label={`Fra konto: ${formData.fromAccount}`}
                >
                  <p>{formData.fromAccount}</p>
                </div>

                <label htmlFor="to-account" className="text-seniorBankDarkBlue">
                  Til konto:{" "}
                </label>
                <Combobox
                  id="to-account"
                  onChange={onSelectAccount}
                  isInputInvalid={isInputInvalid}
                  defaultOptions={approvedAccounts}
                  inputPlaceholder="Skriv inn kontonummer her ..."
                  aria-label="Velg eller skriv inn kontonummer"
                  aria-required="true"
                />

                <div className="relative">
                  <label htmlFor="amount" className="text-seniorBankDarkBlue">
                    Beløp
                  </label>
                  <Input
                    id="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="Skriv inn beløp her ..."
                    name="paymentAmount"
                    className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10 !text-2xl placeholder:text-2xl"
                    aria-required="true"
                    aria-describedby="amount-description"
                  />
                  <BanknoteIcon
                    className="absolute right-2 top-3/4 size-8 -translate-y-1/2 transform text-seniorBankDarkBlue"
                    aria-hidden="true"
                  />
                  <span id="amount-description" className="sr-only">
                    Skriv inn beløpet du vil betale
                  </span>
                </div>

                <label htmlFor="comment" className="text-seniorBankDarkBlue">
                  Kommentar:{" "}
                </label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Skriv inn kommentar her ... "
                  className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pt-4 !text-2xl placeholder:text-2xl"
                  aria-label="Kommentar til betalingen"
                />
              </div>
            </>
          ) : (
            <>
              <section>
                <div
                  className="grid grid-cols-1 justify-between gap-1 rounded-lg text-3xl font-bold text-seniorBankDarkBlue"
                  role="radiogroup"
                  aria-labelledby="step-heading"
                >
                  {approvedAccountOptions.map((option, index) => (
                    <ApprovedAccountView
                      key={index}
                      title={option.title}
                      accountNumber={option.accountNumber}
                      onClick={() => onSelectAccount(option.title)}
                      isSelected={selectedAccount === option.title}
                      id={`account-option-${index}`}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
          <div className="mb-8 mt-8 flex justify-between gap-4">
            <Button
              ref={backButtonRef}
              className="w-[45%] flex-col p-8 px-4 text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              onClick={onGoBack}
              aria-label="Gå tilbake til forrige steg"
            >
              Tilbake
            </Button>
            <Button
              ref={nextButtonRef}
              className="w-[45%] flex-col p-8 px-4 text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              onClick={onClick}
              disabled={isHard ? !onSelectFields : !selectedAccount}
              aria-label={
                isHard
                  ? !onSelectFields
                    ? "Du må fylle inn alle feltene før du kan fortsette"
                    : "Gå til neste steg"
                  : !selectedAccount
                    ? "Du må velge en konto før du kan fortsette"
                    : "Gå til neste steg"
              }
            >
              {isHard
                ? !onSelectFields
                  ? "Fyll inn feltene"
                  : "Neste"
                : !selectedAccount
                  ? "Du må velge en konto"
                  : "Neste"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSecondStep;
