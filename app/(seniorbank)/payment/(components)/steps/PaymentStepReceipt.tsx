import { Button } from "@/ui/atoms/Button";
import { ProgressBar } from "@/ui/organisms/ProgressBar";

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
  return (
    <>
      <section>
        <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
          <ProgressBar totalSteps={4} currentStep={5} />
          <h1 className="text-center text-3xl font-bold text-seniorBankDarkBlue">
            Betalings kvittering{" "}
          </h1>
          <div className="flex justify-center text-3xl">
            <div className="mt-4 grid w-[85%] grid-cols-1 content-end gap-3 rounded-lg border-2 border-seniorBankDarkBlue bg-seniorbankWhite p-4 font-bold text-seniorBankDarkBlue">
              <div>
                <p>Betalt sum:</p>{" "}
                <p className="mb-6 mt-4 indent-4">{formData.amount} kr</p>
              </div>
              <div>
                <p>Fra konto:</p>{" "}
                <p className="mb-6 mt-4 indent-4">{formData.fromAccount}</p>
              </div>
              <div>
                <p>Til konto:</p>{" "}
                <p className="mb-6 mt-4 indent-4">{formData.toAccount}</p>
              </div>
              <div>
                <p>Kommentar:</p>{" "}
                <p className="mb-6 mt-4 indent-4"> {formData.comment}</p>
              </div>
            </div>
          </div>

          <div className="m-10 mr-16 flex items-stretch justify-end">
            <Button
              className="float-left flex w-[45%] flex-col p-8 px-4 text-2xl"
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

export default PaymentFifthStep;
