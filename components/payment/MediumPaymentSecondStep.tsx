import { Button } from "../ui/button";
import { ProgressBar } from "../all/ProgressBar";
import ApprovedAccountView from "./ApprovedAccountView";

interface MediumPaymentSecondStep {
  onClick: () => void;
  onSelectAccount: (account: string) => void;
  onGoBack: () => void;
  approvedAccountOptions: { title: string; accountNumber: number }[];
}

const MediumPaymentSecondStep = ({
  onClick,
  onSelectAccount,
  approvedAccountOptions,
  onGoBack,
}: MediumPaymentSecondStep) => {
  return (
    <>
      <section>
        <div className=" border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
          <ProgressBar totalSteps={3} currentStep={2} />
          <h1 className="text-seniorBankDarkBlue font-bold text-3xl pl-10">
            Velg mottaker:{" "}
          </h1>
          <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-1 text-3xl rounded-lg justify-between">
            {approvedAccountOptions.map((option, index) => (
              <ApprovedAccountView
                title={option.title}
                accountNumber={option.accountNumber}
                key={index}
                onClick={() => onSelectAccount(option.title)}
              />
            ))}
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
            >
              Neste
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MediumPaymentSecondStep;
