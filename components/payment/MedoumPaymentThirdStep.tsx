import { Button } from "../ui/button";
import { ProgressBar } from "../all/ProgressBar";
import { BanknoteIcon } from "lucide-react";
import { Input } from "../ui/input";

interface MediumPaymentThirdStepProps {
  formData: {
    amount: string;
  };
  onClick: () => void;
  onGoBack: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  approvedAccountOptions: { title: string; accountNumber: number }[];
  selectedAmount: string;
}

const MediumPaymentThirdStep = ({
  onClick,
  formData,
  handleChange,
  onGoBack,
  selectedAmount
}: MediumPaymentThirdStepProps) => {
  return (
    <>
      <section>
        <div className=" border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
          <ProgressBar totalSteps={3} currentStep={3} />
          <h1 className="text-seniorBankDarkBlue font-bold text-3xl pl-10">
            Velg mottaker:{" "}
          </h1>
          <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-1 text-3xl rounded-lg justify-between">
            <div className="relative">
              <p>Beløp</p>
              <Input
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Skriv inn beløp her ..."
                className="border-2 border-seniorBankDarkBlue h-20 bg-seniorbankWhite pr-10 !text-2xl placeholder:text-2xl"
              />
              <BanknoteIcon className="absolute size-20 right-2 top-9 text-seniorBankDarkBlue" />
            </div>
          </div>
          <div className="flex items-stretch m-10 justify-between">
            <Button
              className="w-[45%] min-w-0 px-4 text-2xl p-8 flex flex-col float-left"
              onClick={onGoBack}
            >
              Tilbake
            </Button>
            <Button
              className="w-[45%] min-w-0 px-4 text-2xl p-8 flex flex-col float-right"
              onClick={onClick}
              disabled={!selectedAmount}
            >
              {!selectedAmount ? "Skrive inn et beløp" : "Neste"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MediumPaymentThirdStep;
