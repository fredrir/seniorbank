import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaymentFirstStepProps {
  onClick: () => void;
}

const PaymentFirstStep = ({ onClick }: PaymentFirstStepProps) => {
  const buttonClassStyling =
    "bg-seniorBankWhitePurple border-4 hover:border-blue-500 hover:text-seniorbankWhite cursor-pointer group border-seniorBankWhitePurple text-seniorBankDarkBlue  ps-4 flex flex-row gap-4 justify-between";
  const chevronClassStyling =
    "size-16 group-hover:translate-x-1 transition-transform duration-200";
  return (
    <>
      <section>
        <div className="w-2/3 mx-auto">
          <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">
            Betal
          </h1>

          <div className="w-[90%] mx-auto border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
            <div className="flex items-center space-x-4 text-seniorBankGrey text-2xl justify-center mt-7 mb-7">
              <div className="flex items-center justify-center w-14 h-14 bg-seniorBankLightGreen border-2 border-seniorBankGreen rounded-full font-bold">
                {" "}
                1{" "}
              </div>
              <div className="w-12 h-1 bg-seniorBankLightPink"></div>
              <div className="flex items-center justify-center w-14 h-14 bg-seniorBankLightPink rounded-full font-bold">
                {" "}
                2
              </div>
              <div className="w-12 h-1  bg-seniorBankLightPink"></div>
              <div className="flex items-center justify-center w-14 h-14 bg-seniorBankLightPink rounded-full font-bold">
                3
              </div>
            </div>

            <h1 className="text-seniorBankDarkBlue font-bold text-xl pl-10">
              Velg konto du vil betale fra:{" "}
            </h1>

            <div className="grid grid-cols-1 m-10 shadow-md font-bold text-seniorBankDarkBlue gap-1 text-2xl rounded-lg justify-between ">
              <Button className={buttonClassStyling}>
                Sparekonto 830 726
                <ChevronRight className={chevronClassStyling} />
              </Button>
              <Button className={buttonClassStyling}>
                Barnebarn 34 835
                <ChevronRight className={chevronClassStyling} />
              </Button>
              <Button className={buttonClassStyling}>
                Russetid 10 835
                <ChevronRight className={chevronClassStyling} />
              </Button>
            </div>

            <div className="flex justify-end items-center m-10">
              <Button
                className="w-[45%] min-w-0 px-4 text-2xl flex flex-col float-right"
                onClick={onClick}
              >
                Neste
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentFirstStep;
