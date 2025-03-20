import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { ProgressBar } from "../all/ProgressBar";

interface PaymentFourthStepProps {
  onClick: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
  };
}
const PaymentFourtStep = ({ formData, onClick }: PaymentFourthStepProps) => {
  return (
    <>
      <section>
          <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">
            Betal
          </h1>

          <div className="border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6 ">
            <ProgressBar totalSteps={3} currentStep={4} />
            <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">
              Betalings kvittering{" "}
            </h1>
            <div className=" flex justify-center text-3xl">
              <div className="grid grid-cols-1 gap-3 content-end font-bold text-seniorBankDarkBlue rounded-lg bg-seniorbankWhite border-2 border-seniorBankDarkBlue w-[85%] p-4 mt-4">
                <div>
                  <p>Betalt sum:</p>{" "}
                  <p className="indent-4">{formData.amount}</p>
                </div>
                <div>
                  <p>Fra konto:</p> <p className="indent-4">1111.22.33334</p>
                </div>
                <div>
                  <p>Til konto:</p>{" "}
                  <p className="indent-4">{formData.toAccount}</p>
                </div>
                <div>
                  <p>Kommentar:</p>{" "}
                  <p className="indent-4"> {formData.comment}</p>
                </div>
              </div>
            </div>

            <div className="flex items-stretch m-10 justify-end">
              <Button
                className=" px-4 text-2xl p-8 flex flex-col float-left"
                onClick={onClick}
              >
                Hjem
              </Button>
            </div>
          </div>
      </section>
    </>
  );
};

export default PaymentFourtStep;
