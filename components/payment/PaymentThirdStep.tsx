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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  approvedAccountOptions: { title: string; accountNumber: number }[];
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
    if(isHard){
      return (
        <>
          <section>
              <div className="border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
                <ProgressBar totalSteps={3} currentStep={3} />
                <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">
                  Bekreft betaling{" "}
                </h1>
                <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-3 rounded-lg text-3xl">
                  <div className="flex justify-between w-full  items-center mb-6">
                    <p>Du er i ferd med å betale:</p>
                    <p className="text-3xl  items-center">{formData.amount} kr</p>
                  </div>
                  <p>Fra konto:</p>
                  <div className={styling}>
                    {formData.fromAccount}
                  </div>
    
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
                  <p className="text-center mt-6">
                    Dette vil varsle Trygghetskontakten din.
                  </p>
                  <div className="flex items-stretch justify-between mt-6">
                    <Button
                      className="w-[45%] min-w-0 px-4 p-8 text-2xl flex flex-col float-left"
                      onClick={onGoBack}
                    >
                      Tilbake
                    </Button>
                    <Button
                      className="w-[45%] min-w-0 px-4 p-8 text-2xl flex flex-col float-right"
                      onClick={handleSubmit}
                    >
                      Bekreft
                    </Button>
                  </div>
                </div>
              </div>
          </section>
        </>
      );
    }
    else {
      return (
        <>
          <section>
            <div className=" border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
              <ProgressBar totalSteps={4} currentStep={3} />
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
    }
  
};

export default PaymentThirdStep;
