import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
export default function Payment() {
    const accountOptions = [
        {
          title: "Sparekonto",
          description: "Se oversikt over dine kontoer",
        },
        {
          title: "Brukskonto",
          description: "Betale fakturaer og opprett AvtaleGiro",
        },
        {
          title: "Feriekonto",
          description: "Overfør penger mellom egne kontoer",
        },
      ];
    return(
        <section>
          <div className="bg-seniorbankBlue text-white p-5">
            <h1>Temp dev</h1>
          </div>

          <div className="w-2/5 mx-auto">
            <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">Betal</h1>

            <div className="w-[90%] mx-auto border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
              
              <div className="flex items-center space-x-4 text-seniorBankGrey text-2xl justify-center mt-7 mb-7">
                <div className="flex items-center justify-center w-14 h-14 bg-seniorBankLightGreen border-2 border-seniorBankGreen rounded-full font-bold"> 1 </div>
                <div className="w-12 h-1 bg-seniorBankLightPink"></div>
                <div className="flex items-center justify-center w-14 h-14 bg-seniorBankLightPink rounded-full font-bold"> 2</div>
                <div className="w-12 h-1  bg-seniorBankLightPink"></div>
                <div className="flex items-center justify-center w-14 h-14 bg-seniorBankLightPink rounded-full font-bold">3</div>
              </div> 
               
              <h1 className="text-seniorBankDarkBlue font-bold text-xl pl-10">Velg konto du vil betale fra: </h1>
              <div className="grid grid-cols-1 m-10 shadow-md font-bold text-seniorBankDarkBlue gap-1 text-2xl rounded-lg"> 
                <div className="bg-seniorBankWhitePurple border-4 rounded-t-lg hover:border-blue-500 cursor-pointer group border-seniorBankWhitePurple  ps-4 flex flex-row gap-4 justify-between">
                  <div className="flex flex-col justify-center">
                    <h1 className="">Sparekonto</h1>
                  </div>
                  <div className="flex items-center ml-auto justify-center">
                    <p> 830 726 </p>
                    <ChevronRight className="size-16 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>

                <div className="bg-seniorBankWhitePurple border-4 hover:border-blue-500 cursor-pointer group border-seniorBankWhitePurple   ps-4 flex flex-row gap-4 justify-between">
                  <div className="flex flex-col justify-center">
                    <h1 className="">Barnebarn</h1>
                  </div>
                  <div className="flex items-center ml-auto justify-center">
                    <p> 34 835 </p>
                    <ChevronRight className="size-16 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>

                <div className="bg-seniorBankWhitePurple border-4 hover:border-blue-500 cursor-pointer group  border-seniorBankWhitePurple  ps-4 flex flex-row gap-4 justify-between rounded-b-lg">
                  <div className="flex flex-col justify-center">
                    <h1 className="">Russetid</h1>
                  </div>
                  <div className="flex items-center ml-auto justify-center">
                    <p> 10 835 </p>
                    <ChevronRight className="size-16 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center m-10">

              <Button className="w-[45%] min-w-0 px-4 text-2xl flex flex-col">
                Neste
              </Button>
              </div>
              
            </div>
          </div> 
        </section> 
    )
}