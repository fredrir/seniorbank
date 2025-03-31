import { Button } from "../../../../components/atoms/button";
import { ProgressBar } from "../../../../components/organisms/ProgressBar";
import AccountView from "./AccountView";

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
        <div className=" border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
          <ProgressBar totalSteps={3} currentStep={1} />
          <h1 className="text-seniorBankDarkBlue font-bold text-3xl pl-10">
            Velg konto du vil betale fra:{" "}
          </h1>
          <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-1 text-3xl rounded-lg justify-between">
            {accountOptions.map((option, index) => (
              <AccountView
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
