import { Check } from "lucide-react"
import { Button } from "../ui/button";

interface PaymentFourthStepProps {
  onClick: () => void; 
}
const PaymentFourtStep = ({ onClick }: PaymentFourthStepProps ) => {
  return (
    <>
      <section>
        <div className="w-2/3 mx-auto">
          <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">Betal</h1>

          <div className="w-[90%] mx-auto border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">

            <div className="flex items-center space-x-4 text-seniorBankGrey text-2xl justify-center mt-7 mb-7">
              <div className="flex items-center justify-center w-14 h-14 bg-seniorBankGreen border-2 border-seniorBankGreen rounded-full font-bold"> <Check strokeWidth={3} className="size-8"></Check> </div>
              <div className="w-12 h-1 bg-seniorBankGreen"></div>
              <div className="flex items-center justify-center w-14 h-14 bg-seniorBankGreen border-2 border-seniorBankGreen rounded-full font-bold"> <Check strokeWidth={3} className="size-8"></Check> </div>
              <div className="w-12 h-1 bg-seniorBankGreen"></div>
              <div className="flex items-center justify-center w-14 h-14 bg-seniorBankGreen border-2 border-seniorBankGreen rounded-full font-bold"><Check strokeWidth={3} className="size-8"></Check> </div>
            </div>

            <h1 className="text-seniorBankDarkBlue font-bold text-3xl text-center">Betalings kvittering </h1>
            <div className=" flex justify-center">
              <div className="grid grid-cols-1 gap-3 content-end font-bold text-seniorBankDarkBlue rounded-lg text-xl bg-seniorbankWhite border-2 border-seniorBankDarkBlue w-[85%] p-4 mt-4">
                <div>
                  <p>Betalt sum:</p> <p className="indent-4">5000 kr</p>
                  <p className="text-2xl"></p>
                </div>
                <div>
                  <p>Fra konto:</p> <p className="indent-4">1111.22.33334</p>
                  <p className="text-2xl"></p>
                </div>
                <div>
                  <p>Til konto:</p> <p className="indent-4">1111.22.33334</p>
                  <p className="text-2xl"></p>
                </div>
              </div>
            </div>

            <div className="flex items-stretch m-10 justify-end">
              <Button className="w-[45%] min-w-0 px-4 text-2xl flex flex-col float-left" onClick={onClick}>
                Hjem
              </Button>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default PaymentFourtStep;