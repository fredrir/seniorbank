"use client";

import { Button } from "@/components/ui/button";
import { BanknoteIcon} from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

 
import { ProgressBar } from "../all/ProgressBar";
interface PaymentSecondStepProps {
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
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
  return (
    <section>

        <div className="border-4 border-seniorBankLightPurple  bg-seniorBankLightPurple rounded-xl mt-6">
          <ProgressBar totalSteps={3} currentStep={2} />
          <h1 className="text-seniorBankDarkBlue font-bold text-3xl pl-10">
            Trygghetskontakt vil bli varslet{" "}
          </h1>
          <div className="grid grid-cols-1 m-10 font-bold text-seniorBankDarkBlue gap-3 rounded-lg text-3xl">
            <p>Fra konto: </p>
            <div className="border-2 border-seniorBankDarkBlue h-20 bg-seniorbankWhite ps-3 pr-10 !text-2xl flex items-center rounded-md">
              <p>{formData.fromAccount}</p>
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
                name="paymentToAccount"
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
                name="paymentAmount"
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
