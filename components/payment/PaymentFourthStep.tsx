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
        <div className="w-2/3 mx-auto">
          <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">
            Betal
          </h1>

          <div className="w-[90%] mx-auto border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
            <ProgressBar totalSteps={3} currentStep={4} />
            <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">
              Betalings kvittering{" "}
            </h1>
            <div className=" flex justify-center">
              <div className="grid grid-cols-1 gap-3 content-end font-bold text-seniorBankDarkBlue rounded-lg text-xl bg-seniorbankWhite border-2 border-seniorBankDarkBlue w-[85%] p-4 mt-4">
                <div>
                  <p>Betalt sum:</p>{" "}
                  <p className="indent-4">{formData.amount}</p>
                  <p className="text-2xl"></p>
                </div>
                <div>
                  <p>Fra konto:</p> <p className="indent-4">1111.22.33334</p>
                  <p className="text-2xl"></p>
                </div>
                <div>
                  <p>Til konto:</p>{" "}
                  <p className="indent-4">{formData.toAccount}</p>
                  <p className="text-2xl"></p>
                </div>
                <div>
                  <p>Kommentar:</p>{" "}
                  <p className="indent-4"> {formData.comment}</p>
                </div>
              </div>
            </div>

            <div className="flex items-stretch m-10 justify-end">
              <Button
                className="w-[45%] min-w-0 px-4 text-2xl flex flex-col float-left"
                onClick={onClick}
              >
                Hjem
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentFourtStep;
