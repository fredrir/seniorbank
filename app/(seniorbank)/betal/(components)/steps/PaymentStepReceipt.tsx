"use client";

import { Button } from "@/ui/atoms/Button";
import { ProgressBar } from "@/ui/organisms/ProgressBar";
import { useRef, useEffect } from "react";

interface PaymentFifthStepProps {
  onClick: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
  };
}

const PaymentFifthStep = ({ formData, onClick }: PaymentFifthStepProps) => {
  const homeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (homeButtonRef.current) {
      homeButtonRef.current.focus();
    }
  }, []);

  return (
    <section aria-labelledby="step-heading">
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <ProgressBar totalSteps={4} currentStep={5} />
        <h1
          id="step-heading"
          className="text-center text-3xl font-bold text-seniorBankDarkBlue"
        >
          Betalings kvittering
        </h1>
        <div className="flex justify-center text-3xl">
          <div
            className="mt-4 grid w-[85%] grid-cols-1 content-end gap-3 rounded-lg border-2 border-seniorBankDarkBlue bg-seniorbankWhite p-4 font-bold text-seniorBankDarkBlue"
            role="region"
            aria-label="Betalingskvittering"
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

        <div className="m-10 mr-16 flex items-stretch justify-end">
          <Button
            ref={homeButtonRef}
            className="float-left flex w-[45%] flex-col p-8 px-4 text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={onClick}
            aria-label="Gå til hjemmesiden"
          >
            Hjem
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentFifthStep;
