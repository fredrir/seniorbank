"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BanknoteIcon, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
interface PaymentSecondStepProps {
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
  }
  handleNext: () => void;
  onGoBack: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PaymentSecondStep = ({ formData,handleChange, handleNext, onGoBack }: PaymentSecondStepProps) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null); 
  return (

    <section>
      <div className="w-2/3 mx-auto">
        <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">Betal</h1>


        <div className="w-[90%] mx-auto border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">

          <div className="flex items-center space-x-4 text-seniorBankGrey text-2xl justify-center mt-7 mb-7">
            <div className="flex items-center justify-center w-14 h-14 bg-seniorBankGreen border-2 border-seniorBankGreen rounded-full font-bold"> <Check strokeWidth={3} className="size-8"></Check> </div>
            <div className="w-12 h-1 bg-seniorBankGreen"></div>
            <div className="flex items-center justify-center w-14 h-14 bg-seniorBankLightGreen border-2 border-seniorBankGreen rounded-full font-bold"> 2</div>
            <div className="w-12 h-1  bg-seniorBankLightPink"></div>
            <div className="flex items-center justify-center w-14 h-14 bg-seniorBankLightPink rounded-full font-bold">3</div>
          </div>

          <h1 className="text-seniorBankDarkBlue font-bold text-xl pl-10">Trygghetskontakt vil bli varslet </h1>
          <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-3 rounded-lg text-xl">
            <p>Fra konto: </p>
            <div className="w-full">
              <Select onValueChange={(value) => setSelectedAccount(value)}>
                <SelectTrigger className="bg-seniorbankWhite border-2 border-seniorBankDarkBlue rounded-lg w-full flex items-center justify-between px-4 h-12">
                  <SelectValue placeholder="Velg en konto" className="text-xl" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg w-full shadow-md pt-3 pb-3 z-10 mt-1 text-xl">
                  <SelectGroup className="flex flex-col items-center ">
                    <SelectItem value={"sparekonto"} className="text-xl">Sparekonto 830 726 kr</SelectItem>
                    <SelectItem value={"barnebarn"} className="text-xl">Barnebarn 34 835 kr</SelectItem>
                    <SelectItem value={"russetid"} className="text-xl">Russetid 10 835 kr</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <p>Til konto: </p>
            <div className="relative">
              <Input  id="toAccount" value={formData.toAccount} onChange={handleChange} type="text" inputMode="numeric" pattern="\d*"  placeholder="Skriv inn kontonummer her ..." className="border-2 pt-2 pb-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10"/>
            </div>
            <div className="relative">
              <p>Beløp</p>
              <Input id="amount" value={formData.amount} onChange={handleChange} type="text" inputMode="numeric" pattern="\d*"  placeholder="Skriv inn beløp her ..." className="border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10"/>
              <BanknoteIcon className="absolute size-8 right-2 top-3/4 transform -translate-y-1/2 text-seniorBankDarkBlue" />
            </div>
            <p>Kommentar: </p>
            <Textarea id="comment" value={formData.comment} onChange={handleChange}
            placeholder="Skriv inn kommentar her ... " className="border-2 border-seniorBankDarkBlue bg-seniorbankWhite" 
            />
          </div>
          <div className="flex items-stretch m-10 justify-between">
            
            <Button className="w-[45%] min-w-0 px-4 text-2xl flex flex-col float-left" onClick={onGoBack}>
              Tilbake
            </Button>
            <Button className="w-[45%] min-w-0 px-4 text-2xl flex flex-col float-right" onClick={handleNext}>
              Neste
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSecondStep;
