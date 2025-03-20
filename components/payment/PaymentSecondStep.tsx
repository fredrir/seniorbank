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
import { ProgressBar } from "../all/ProgressBar";
interface PaymentSecondStepProps {
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
  };
  handleNext: () => void;
  onGoBack: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const PaymentSecondStep = ({
  formData,
  handleChange,
  handleNext,
  onGoBack,
}: PaymentSecondStepProps) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  return (
    <section>
        <h1 className="text-seniorBankDarkBlue font-bold text-4xl mt-5">
          Betal
        </h1>
        <div className="border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
          <ProgressBar totalSteps={3} currentStep={2} />
          <h1 className="text-seniorBankDarkBlue font-bold text-3xl pl-10">
            Trygghetskontakt vil bli varslet{" "}
          </h1>
          <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-3 rounded-lg text-3xl">
            <p>Fra konto: </p>
            <div className="w-full">
              <Select onValueChange={(value) => setSelectedAccount(value)}>
                <SelectTrigger className="bg-seniorbankWhite border-2 border-seniorBankDarkBlue rounded-lg w-full flex items-center justify-between px-4 h-12">
                  <SelectValue
                    placeholder="Velg en konto"
                    className="!text-2xl placeholder:text-2xl"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg w-full shadow-md pt-3 pb-3 z-10 mt-1 text-xl">
                  <SelectGroup className="flex flex-col items-center ">
                    <SelectItem value={"sparekonto"} className="text-xl">
                      Sparekonto 830 726 kr
                    </SelectItem>
                    <SelectItem value={"barnebarn"} className="text-xl">
                      Barnebarn 34 835 kr
                    </SelectItem>
                    <SelectItem value={"russetid"} className="text-xl">
                      Russetid 10 835 kr
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <p>Til konto: </p>
            <div className="relative">
              <Input
                id="toAccount"
                value={formData.toAccount}
                onChange={handleChange}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Skriv inn kontonummer her ..."
                className="border-2 pt-2 pb-2 border-seniorBankDarkBlue h-20 !text-2xl bg-seniorbankWhite pr-10  placeholder:text-2xl"
              />
            </div>
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
              <BanknoteIcon className="absolute size-8 right-2 top-3/4 transform -translate-y-1/2 text-seniorBankDarkBlue" />
            </div>
            <p>Kommentar: </p>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Skriv inn kommentar her ... "
              className="border-2 border-seniorBankDarkBlue h-20 bg-seniorbankWhite !text-2xl placeholder:text-2xl"
            />
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
              onClick={handleNext}
            >
              Neste
            </Button>
          </div>
        </div>
    </section>
  );
};

export default PaymentSecondStep;
