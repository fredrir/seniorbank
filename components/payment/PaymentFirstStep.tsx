import { Button } from "../ui/button";
import { ProgressBar } from "../all/ProgressBar";
import AccountView from "./AccountView";

interface PaymentFirstStepProps {
  onClick: () => void;
  onSelectAccount: (account: string) => void;
  accountOptions: { title: string; amount: number }[];
  selectedAccount: string;
  isHard: boolean;
}

const PaymentFirstStep = ({
  onClick,
  onSelectAccount,
  accountOptions,
  selectedAccount,
  isHard,
}: PaymentFirstStepProps) => {


  const hardProgressbar = <ProgressBar totalSteps={3} currentStep={1} />;
  const mediumProgressbar = <ProgressBar totalSteps={4} currentStep={1} />;

  return (
    <>
      <section>
        <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
          {isHard ? hardProgressbar : mediumProgressbar}
          <h1 className="pl-10 text-3xl font-bold text-seniorBankDarkBlue">
            Velg konto du vil betale fra:{" "}
          </h1>
          <div className="m-10 grid grid-cols-1 justify-between gap-1 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
            {accountOptions.map((option, index) => (
              <AccountView
                key={index}
                title={option.title}
                amount={option.amount}
                onClick={() => onSelectAccount(option.title)}
                isSelected={selectedAccount === option.title}
              />
            ))}
          </div>

          <div className="m-10 flex items-center justify-end">
            <Button
              className="float-right flex w-[45%] min-w-0 flex-col p-8 px-4 text-2xl"
              onClick={onClick}
              disabled={!selectedAccount}
            >
              {!selectedAccount ? "Du må velge en konto" : "Neste"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentFirstStep;
