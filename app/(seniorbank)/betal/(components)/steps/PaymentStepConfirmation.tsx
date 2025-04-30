"use client";

import { Button } from "@/ui/atoms/Button";
import { ProgressBar } from "@/ui/organisms/ProgressBar";
import { useRef, useEffect } from "react";

interface PaymentFourthStepProps {
  onClick: () => void;
  onGoBack: () => void;
  onGoToHomepage: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
  };
  isHard: boolean;
}

const PaymentConfirmationStep = ({
  formData,
  onClick,
  isHard,
  onGoBack,
  onGoToHomepage,
}: PaymentFourthStepProps) => {
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isHard) {
      if (nextButtonRef.current) {
        nextButtonRef.current.focus();
      }
    } else if (backButtonRef.current) {
      backButtonRef.current.focus();
    }
  }, [isHard]);

  return (
    <section aria-labelledby="step-heading">
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <ProgressBar totalSteps={isHard ? 3 : 4} currentStep={4} />

        <h1
          id="step-heading"
          className="ml-10 text-3xl font-bold text-seniorBankDarkBlue"
        >
          {isHard ? "Betalingskvittering" : "Bekreft betaling"}
        </h1>

        <div className="flex text-3xl">
          <div
            className="ml-10 mr-10 mt-4 grid w-full grid-cols-1 content-end gap-3 rounded-lg border-2 border-seniorBankDarkBlue bg-seniorbankWhite p-4 font-bold text-seniorBankDarkBlue"
            role="region"
            aria-label="Betalingsdetaljer"
          >
            <div>
              <p id="amount-label">Betalt sum:</p>
              <p className="mb-6 mt-4 indent-4" aria-labelledby="amount-label">
                {formData.amount} kr
              </p>
            </div>
            <div>
              <p id="from-account-label">Fra konto:</p>
              <p
                className="mb-6 mt-4 indent-4"
                aria-labelledby="from-account-label"
              >
                {formData.fromAccount}
              </p>
            </div>
            <div>
              <p id="to-account-label">Til konto:</p>
              <p
                className="mb-6 mt-4 indent-4"
                aria-labelledby="to-account-label"
              >
                {formData.toAccount}
              </p>
            </div>
            <div>
              <p id="comment-label">Kommentar:</p>
              <p className="mb-6 mt-4 indent-4" aria-labelledby="comment-label">
                {formData.comment || "Ingen kommentar"}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`m-10 flex items-stretch ${isHard ? "justify-end" : "justify-between"}`}
        >
          {!isHard && (
            <Button
              ref={backButtonRef}
              className="w-[45%] flex-col p-8 px-4 text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              onClick={onGoBack}
              aria-label="Gå tilbake til forrige steg"
            >
              Tilbake
            </Button>
          )}
          <Button
            ref={nextButtonRef}
            className="w-[45%] flex-col p-8 px-4 text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={isHard ? onGoToHomepage : onClick}
            aria-label={isHard ? "Gå til hjemmesiden" : "Bekreft betalingen"}
          >
            {isHard ? "Hjem" : "Bekreft"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentConfirmationStep;
