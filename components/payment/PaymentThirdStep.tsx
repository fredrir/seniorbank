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
    "bg-seniorbankWhite border-2 border-seniorBankDarkBlue rounded-lg w-full flex justify-between h-20  items-center p-4";
  return (
    <>
      <section>
          <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">
            Betal
          </h1>

          <div className="border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
            <ProgressBar totalSteps={3} currentStep={3} />
            <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">
              Bekreft betaling{" "}
            </h1>
            <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-3 rounded-lg text-3xl">
              <div className="flex justify-between w-full  items-center mb-6">
                <p>Du er i ferd med å betale:</p>
                <p className="text-3xl  items-center">{formData.amount}</p>
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
              <p className="text-center mt-6">
                Dette vil varsle Trygghetskontakten din.
              </p>
              <div className="flex items-stretch justify-between mt-6">
                <Button
                  className="w-[45%] min-w-0 px-4 p-8 text-2xl flex flex-col float-left"
                  onClick={onGoBack}
                >
                  Tilbake
                </Button>
                <Button
                  className="w-[45%] min-w-0 px-4 p-8 text-2xl flex flex-col float-right"
                  onClick={onClick}
                >
                  Bekreft
                </Button>
              </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default PaymentThirdStep;
