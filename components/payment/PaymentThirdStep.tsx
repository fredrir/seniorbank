import { Button } from "../ui/button";
import { ProgressBar } from "../all/ProgressBar";
import { BanknoteIcon } from "lucide-react";
import { Input } from "../ui/input";
interface PaymentThirdStepProps {
  onClick: () => void;
  onGoBack: () => void;
  handleSubmit: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
  };

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  approvedAccountOptions: { title: string; accountNumber: string }[];
  selectedAmount: string;
  isHard: boolean;
}

const PaymentThirdStep = ({
  formData,
  onClick,
  handleSubmit,
  onGoBack,
  handleChange,
  selectedAmount,
  isHard,
}: PaymentThirdStepProps) => {
  const styling =
    "bg-seniorbankWhite border-2 border-seniorBankDarkBlue rounded-lg w-full flex justify-between h-20  items-center p-4";
  return (
    <section>
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <ProgressBar totalSteps={isHard ? 3 : 4} currentStep={3} />
        <h1 className="pl-10 text-3xl font-bold text-seniorBankDarkBlue">
          {isHard ? "Bekreft betaling" : "Beløp"}
        </h1>
        <div className="m-10 grid grid-cols-1 gap-3 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
          {isHard ? (
            <>
              <div className="mb-6 flex w-full items-center justify-between">
                <p>Du er i ferd med å betale:</p>
                <p className="items-center text-3xl">{formData.amount} kr</p>
              </div>
              <p>Fra konto:</p>
              <div className={styling}>{formData.fromAccount}</div>

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
            </>
          ) : (
            <>
              <div className="relative">
                <Input
                  id="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="Skriv inn beløp her ..."
                  className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10 !text-2xl placeholder:text-2xl"
                />
                <BanknoteIcon className="absolute right-2 top-0 size-20 text-seniorBankDarkBlue" />
              </div>
            </>
          )}
        </div>
        <div className="ml-10 mr-10 flex items-stretch justify-between">
          <Button
            className="float-left flex w-[45%] min-w-0 flex-col p-8 px-4 text-2xl"
            onClick={onGoBack}
          >
            Tilbake
          </Button>
          <Button
            className="float-right flex w-[45%] min-w-0 flex-col p-8 px-4 text-2xl"
            onClick={isHard ? handleSubmit : onClick}
            disabled={!selectedAmount}
          >
            {isHard
              ? "Bekreft betaling"
              : !selectedAmount
                ? "Skrive inn et beløp"
                : "Neste"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentThirdStep;
