import { Check, Link } from "lucide-react";
import { Button } from "../ui/button";
import { ProgressBar } from "../all/ProgressBar";
interface PaymentThirdStepProps {
  onClick: () => void;
  onGoBack: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
  };
}

const PaymentThirdStep = ({
  formData,
  onClick,
  onGoBack,
}: PaymentThirdStepProps) => {
  const styling =
    "bg-seniorbankWhite border-2 border-seniorBankDarkBlue rounded-lg w-full flex justify-between items-center p-4";
  return (
    <>
      <section>
        <div className="w-2/3 mx-auto">
          <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">
            Betal
          </h1>

          <div className="w-[90%] mx-auto border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
            <ProgressBar totalSteps={3} currentStep={3} />
            <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">
              Bekreft betaling{" "}
            </h1>
            <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-3 rounded-lg text-xl">
              <div className="flex justify-between w-full items-center">
                <p>Du er i ferd med å betale:</p>
                <p className="text-2xl">{formData.amount}</p>
              </div>
              <p>Fra konto:</p>
              <div className={styling}>
                <p>Sparekonto</p>
                <p className="text-2xl">830 726 kr</p>
              </div>

              <p>Til konto:</p>
              <div className={styling}>
                <p>{formData.toAccount}</p>
                <p className="text-2xl"></p>
              </div>
              <p>Kommentar:</p>
              <div className={styling}>
                <p>{formData.comment}</p>
                <p className="text-2xl"></p>
              </div>
              <p className="text-center">
                Dette vil varsle Trygghetskontakten din.
              </p>
              <div className="flex items-stretch justify-between">
                <Button
                  className="w-[45%] min-w-0 px-4 text-2xl flex flex-col float-left"
                  onClick={onGoBack}
                >
                  Tilbake
                </Button>
                <Button
                  className="w-[45%] min-w-0 px-4 text-2xl flex flex-col float-right"
                  onClick={onClick}
                >
                  Bekreft
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentThirdStep;
