"use client";

import { Button } from "@/components/atoms/button";
import { BanknoteIcon } from "lucide-react";

import { Textarea } from "@/components/atoms/textarea";
import { Input } from "@/components/atoms/input";

import { ProgressBar } from "../../../../components/organisms/ProgressBar";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <ProgressBar totalSteps={3} currentStep={2} />
        <h1 className="pl-10 text-3xl font-bold text-seniorBankDarkBlue">
          Trygghetskontakt vil bli varslet{" "}
        </h1>
        <div className="m-10 grid grid-cols-1 gap-3 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
          <p>Fra konto: </p>
          <div className="flex h-20 items-center rounded-md border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10 ps-3 !text-2xl">
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
              name="paymentToAccount"
              placeholder="Skriv inn kontonummer her ..."
              className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pb-2 pr-10 pt-2 !text-2xl placeholder:text-2xl"
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
              className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite pr-10 !text-2xl placeholder:text-2xl"
            />
            <BanknoteIcon className="absolute right-2 top-3/4 size-8 -translate-y-1/2 transform text-seniorBankDarkBlue" />
          </div>
          <p>Kommentar: </p>
          <Textarea
            id="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Skriv inn kommentar her ... "
            className="h-20 border-2 border-seniorBankDarkBlue bg-seniorbankWhite !text-2xl placeholder:text-2xl"
          />
        </div>
        <div className="m-10 flex items-stretch justify-between">
          <Button
            className="float-left flex w-[45%] min-w-0 flex-col p-8 px-4 text-2xl"
            onClick={onGoBack}
          >
            Tilbake
          </Button>
          <Button
            className="float-right flex w-[45%] min-w-0 flex-col p-8 px-4 text-2xl"
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
