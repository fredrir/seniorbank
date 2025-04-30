"use client";

import type React from "react";

import { Button } from "@/ui/atoms/Button";
import { ProgressBar } from "@/ui/organisms/ProgressBar";
import PaymentAccountCard from "../PaymentAccountCard";
import { useRef, useEffect } from "react";

interface PaymentFirstStepProps {
  onClick: () => void;
  onSelectAccount: (account: string) => void;
  accountOptions: { title: string; amount: number }[];
  selectedAccount: string;
  isHard: boolean;
}

const PaymentFirstStep = ({
  onClick,
  onSelectAccount,
  accountOptions,
  selectedAccount,
  isHard,
}: PaymentFirstStepProps) => {
  const firstAccountRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus the first account option when component mounts
    if (firstAccountRef.current) {
      firstAccountRef.current.focus();
    }
  }, []);

  const hardProgressbar = <ProgressBar totalSteps={3} currentStep={1} />;
  const mediumProgressbar = <ProgressBar totalSteps={4} currentStep={1} />;

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % accountOptions.length;
      const nextElement = document.getElementById(
        `account-option-${nextIndex}`,
      );
      nextElement?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        (index - 1 + accountOptions.length) % accountOptions.length;
      const prevElement = document.getElementById(
        `account-option-${prevIndex}`,
      );
      prevElement?.focus();
    }
  };

  return (
    <section aria-labelledby="step-heading">
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        {isHard ? hardProgressbar : mediumProgressbar}
        <h1
          id="step-heading"
          className="pl-10 text-3xl font-bold text-seniorBankDarkBlue"
        >
          Velg konto du vil betale fra:{" "}
        </h1>
        <div
          className="grid grid-cols-1 justify-between gap-2 rounded-lg text-3xl font-bold text-seniorBankDarkBlue"
          role="radiogroup"
          aria-labelledby="step-heading"
        >
          {accountOptions.map((option, index) => (
            <PaymentAccountCard
              key={index}
              ref={index === 0 ? firstAccountRef : undefined}
              title={option.title}
              amount={option.amount}
              onClick={() => onSelectAccount(option.title)}
              isSelected={selectedAccount === option.title}
              id={`account-option-${index}`}
              onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <div className="m-10 flex items-center justify-end">
          <Button
            ref={nextButtonRef}
            className="float-right flex w-[45%] min-w-0 flex-col p-8 px-4 text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={onClick}
            disabled={!selectedAccount}
            aria-label={
              !selectedAccount
                ? "Du må velge en konto før du kan fortsette"
                : "Gå til neste steg"
            }
          >
            {!selectedAccount ? "Du må velge en konto" : "Neste"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentFirstStep;
