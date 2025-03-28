import { Button } from "../ui/button";
import { ProgressBar } from "../all/ProgressBar";

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
const PaymentFourtStep = ({
  formData,
  onClick,
  isHard,
  onGoBack,
  onGoToHomepage,
}: PaymentFourthStepProps) => {
  return (
    <section>
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <ProgressBar totalSteps={isHard ? 3 : 4} currentStep={4} />

        <h1 className="ml-10 text-3xl font-bold text-seniorBankDarkBlue">
          {isHard ? "Betalings kvittering" : "Bekreft betaling"}
        </h1>

        <div className="flex text-3xl">
          <div className="ml-10 mr-10 mt-4 grid w-full grid-cols-1 content-end gap-3 rounded-lg border-2 border-seniorBankDarkBlue bg-seniorbankWhite p-4 font-bold text-seniorBankDarkBlue">
            <div>
              <p>Betalt sum:</p>
              <p className="mb-6 mt-4 indent-4">{formData.amount} kr</p>
            </div>
            <div>
              <p>Fra konto:</p>
              <p className="mb-6 mt-4 indent-4">{formData.fromAccount}</p>
            </div>
            <div>
              <p>Til konto:</p>
              <p className="mb-6 mt-4 indent-4">{formData.toAccount}</p>
            </div>
            <div>
              <p>Kommentar:</p>
              <p className="mb-6 mt-4 indent-4">{formData.comment}</p>
            </div>
          </div>
        </div>

        <div
          className={`m-10 flex items-stretch ${isHard ? "justify-end" : "justify-between"}`}
        >
          {!isHard && (
            <Button
              className="w-[45%] flex-col p-8 px-4 text-2xl"
              onClick={onGoBack}
            >
              Tilbake
            </Button>
          )}
          <Button
            className="w-[45%] flex-col p-8 px-4 text-2xl"
            onClick={isHard ? onGoToHomepage : onClick}
          >
            {isHard ? "Hjem" : "Bekreft"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentFourtStep;
