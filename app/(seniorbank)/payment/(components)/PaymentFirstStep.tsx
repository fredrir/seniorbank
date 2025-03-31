import { Button } from "@/components/atoms/button";
import { ProgressBar } from "@/components/organisms/ProgressBar";
import PaymentAccountCard from "./PaymentAccountCard";

interface PaymentFirstStepProps {
  onClick: () => void;
  onSelectAccount: (account: string) => void;
  accountOptions: { title: string; amount: number }[];
}

const PaymentFirstStep = ({
  onClick,
  onSelectAccount,
  accountOptions,
}: PaymentFirstStepProps) => {
  return (
    <>
      <section>
        <div className=" border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl p-8">
          <ProgressBar totalSteps={3} currentStep={1} />
          <h1 className="text-seniorBankDarkBlue font-bold text-3xl mb-4">
            Velg konto du vil betale fra:
          </h1>
          <div className="grid grid-cols-1 font-bold text-seniorBankDarkBlue gap-2 text-3xl rounded-lg justify-between">
            {accountOptions.map((option, index) => (
              <PaymentAccountCard
                title={option.title}
                amount={option.amount}
                key={index}
                onClick={() => onSelectAccount(option.title)}
              />
            ))}
          </div>

          <div className="flex justify-end items-center m-10">
            <Button
              className="w-[45%] min-w-0 px-4 text-2xl p-8 flex flex-col float-right"
              onClick={onClick}
            >
              Neste
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentFirstStep;
