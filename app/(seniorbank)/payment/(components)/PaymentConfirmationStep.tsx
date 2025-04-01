"use client";

import { Button } from "@/ui/atoms/Button";
import { ProgressBar } from "@/ui/organisms/ProgressBar";

interface PaymentFourthStepProps {
  onClick: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
  };
}
const PaymentConfirmationStep = ({ formData, onClick }: PaymentFourthStepProps) => {
  return (
    <>
      <section>
          <div className="border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6 ">
            <ProgressBar totalSteps={3} currentStep={4} />
            <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">
              Betalingskvittering
            </h1>
            <div className=" flex justify-center text-3xl">
              <div className="grid grid-cols-1 gap-3 content-end font-bold text-seniorBankDarkBlue rounded-lg bg-seniorbankWhite border-2 border-seniorBankDarkBlue w-[85%] p-4 mt-4">
                <div>
                  <p>Betalt sum:</p>
                  <p className="indent-4 mt-4 mb-6">{formData.amount} kr</p>
                </div>
                <div>
                  <p>Fra konto:</p> <p className="indent-4 mt-4 mb-6">{formData.fromAccount}</p>
                </div>
                <div>
                  <p>Til konto:</p>
                  <p className="indent-4 mt-4 mb-6">{formData.toAccount}</p>
                </div>
                <div>
                  <p>Kommentar:</p>
                  <p className="indent-4 mt-4 mb-6"> {formData.comment}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end m-4">
              <Button onClick={onClick}>
                Hjem
              </Button>
            </div>
          </div>
      </section>
    </>
  );
};

export default PaymentConfirmationStep;
