"use client";

import type React from "react";

import { ProgressBar } from "@/ui/organisms/ProgressBar";
import { BanknoteIcon } from "lucide-react";
import { Input } from "@/ui/atoms/Input";
import { Button } from "@/ui/atoms/Button";
import { useRef, useEffect } from "react";

interface PaymentThirdStepProps {
  onClick: () => void;
  onGoBack: () => void;
  handleSubmit: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
  };

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  approvedAccountOptions: { title: string; accountNumber: string }[];
  selectedAmount: string;
  isHard: boolean;
}

const PaymentThirdStep = ({
  formData,
  onClick,
  handleSubmit,
  onGoBack,
  handleChange,
  selectedAmount,
  isHard,
}: PaymentThirdStepProps) => {
  const amountInputRef = useRef<HTMLInputElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isHard) {
      if (backButtonRef.current) {
        backButtonRef.current.focus();
      }
    } else if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [isHard]);

  const styling =
    "bg-seniorbankWhite border-2 border-seniorBankDarkBlue rounded-lg w-full flex justify-between h-20 items-center p-4";

  return (
    <section aria-labelledby="step-heading">
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <ProgressBar totalSteps={isHard ? 3 : 4} currentStep={3} />
        <h1
          id="step-heading"
          className="pl-10 text-3xl font-bold text-seniorBankDarkBlue"
        >
          {isHard ? "Bekreft betaling" : "Beløp"}
        </h1>
        <div className="m-10 grid grid-cols-1 gap-3 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
          {isHard ? (
            <>
              <div className="mb-6 flex w-full items-center justify-between">
                <p id="payment-amount-label">Du er i ferd med å betale:</p>
                <p
                  className="items-center text-3xl"
                  aria-labelledby="payment-amount-label"
                >
                  {formData.amount} kr
                </p>
              </div>

              <p id="from-account-label">Fra konto:</p>
              <div className={styling} aria-labelledby="from-account-label">
                {formData.fromAccount}
              </div>

              <p id="to-account-label">Til konto:</p>
              <div className={styling} aria-labelledby="to-account-label">
                <p>{formData.toAccount}</p>
                <p className="text-2xl"></p>
              </div>

              <p id="comment-label">Kommentar:</p>
              <div className={styling} aria-labelledby="comment-label">
                <p>{formData.comment || "Ingen kommentar"}</p>
                <p className="text-2xl"></p>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <label htmlFor="amount" className="mb-2 block">
                  Beløp
                </label>
                <Input
                  id="amount"
                  ref={amountInputRef}
                  value={formData.amount}
                  onChange={handleChange}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="Skriv inn beløp her ..."
                  className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10 !text-2xl placeholder:text-2xl"
                  aria-required="true"
                  aria-describedby="amount-description"
                />
                <BanknoteIcon
                  className="absolute right-2 top-0 size-20 text-seniorBankDarkBlue"
                  aria-hidden="true"
                />
                <span id="amount-description" className="sr-only">
                  Skriv inn beløpet du vil betale
                </span>
              </div>
            </>
          )}
        </div>
        <div className="ml-10 mr-10 flex items-stretch justify-between">
          <Button
            ref={backButtonRef}
            className="float-left flex w-[45%] min-w-0 flex-col p-8 px-4 text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={onGoBack}
            aria-label="Gå tilbake til forrige steg"
          >
            Tilbake
          </Button>
          <Button
            ref={nextButtonRef}
            className="float-right flex w-[45%] min-w-0 flex-col p-8 px-4 text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={isHard ? handleSubmit : onClick}
            disabled={!selectedAmount}
            aria-label={
              isHard
                ? "Bekreft betalingen"
                : !selectedAmount
                  ? "Du må skrive inn et beløp før du kan fortsette"
                  : "Gå til neste steg"
            }
          >
            {isHard
              ? "Bekreft betaling"
              : !selectedAmount
                ? "Skrive inn et beløp"
                : "Neste"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentThirdStep;
