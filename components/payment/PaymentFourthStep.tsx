import { Button } from "../ui/button";
import { ProgressBar } from "../all/ProgressBar";

interface PaymentFourthStepProps {
  onClick: () => void;
  onGoBack: () => void;
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;    
  };
  isHard: boolean;
  
}
const PaymentFourtStep = ({ formData, onClick, isHard, onGoBack }: PaymentFourthStepProps) => {
  const styling =
    "bg-seniorbankWhite border-2 border-seniorBankDarkBlue rounded-lg w-full flex justify-between h-20  items-center p-4";
  if(isHard){
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
  }
  else {
    return (
      <>
        <section>
          <h1>HALLA</h1>
          <div className="border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
            <ProgressBar totalSteps={4} currentStep={4} />
            <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">
              Bekreft betaling{" "}
            </h1>
            <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-3 rounded-lg text-3xl">
              <div className="flex justify-between w-full  items-center mb-6">
                <p>Du er i ferd med å betale:</p>
                <p className="text-3xl  items-center">{formData.amount} kr</p>
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
              <div className="flex items-stretch justify-between mt-6">
                <Button
                  className="w-[45%] min-w-0 px-4 p-8 text-2xl flex flex-col float-left"
                  onClick={onGoBack}
                >
                  Tilbake
                </Button>
                <Button
                  className="w-[45%] min-w-0 px-4 p-8 text-2xl flex flex-col float-right"
                  onClick={onClick}
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
  
};

export default PaymentFourtStep;
