import { Button } from "@/components/atoms/button";
import { ProgressBar } from "@/components/organisms/ProgressBar";

interface PaymentFourthStepProps {
  onClick: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
  };
}
const PaymentFourtStep = ({ formData, onClick }: PaymentFourthStepProps) => {
  return (
    <>
      <section>
          <div className="border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6 ">
            <ProgressBar totalSteps={3} currentStep={4} />
            <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">
              Betalings kvittering{" "}
            </h1>
            <div className=" flex justify-center text-3xl">
              <div className="grid grid-cols-1 gap-3 content-end font-bold text-seniorBankDarkBlue rounded-lg bg-seniorbankWhite border-2 border-seniorBankDarkBlue w-[85%] p-4 mt-4">
                <div>
                  <p>Betalt sum:</p>{" "}
                  <p className="indent-4 mt-4 mb-6">{formData.amount} kr</p>
                </div>
                <div>
                  <p>Fra konto:</p> <p className="indent-4 mt-4 mb-6">{formData.fromAccount}</p>
                </div>
                <div>
                  <p>Til konto:</p>{" "}
                  <p className="indent-4 mt-4 mb-6">{formData.toAccount}</p>
                </div>
                <div>
                  <p>Kommentar:</p>{" "}
                  <p className="indent-4 mt-4 mb-6"> {formData.comment}</p>
                </div>
              </div>
            </div>

            <div className="flex items-stretch m-10 mr-16 justify-end">
              <Button
                className=" w-[45%] px-4 text-2xl p-8 flex flex-col float-left"
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
