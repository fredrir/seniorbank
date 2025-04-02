import { Button } from "@/components/ui/button";
import {
  BanknoteIcon,
  Calculator,
  Calendar,
  Command,
  Smile,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
// import { SearchSelect } from "@/components/payment/SearchSelect";
import { Input } from "@/components/ui/input";
import ApprovedAccountView from "./ApprovedAccountView";
import { ProgressBar } from "../all/ProgressBar";
import Ptest from "./Ptest";
import PreviousAccountTransactions from "./PreviousAccountTransactions";
import Combobox from "./Combobox";


interface PaymentSecondStepProps {
  formData: {
    comment: string;
    amount: string;
    toAccount: string;
    fromAccount: string;
  };
  onGoBack: () => void;
  onhandleAccountNumber: (accountNumber: string) => void;
  onClick: () => void;
  onSelectFields: boolean;
  onSelectAccount: (account: string) => void;
  approvedAccountOptions: { title: string; accountNumber: string }[];
  transactionOptions: { accountNumber: string }[];
  // approvedTransactionOptions:  { title: string; accountNumber: number }[];
  selectedAccount: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isHard: boolean;
}

const PaymentSecondStep = ({
  formData,
  handleChange,
  onSelectFields,
  onGoBack,
  isHard,
  onClick,
  transactionOptions,
  onSelectAccount,
  onhandleAccountNumber,
  approvedAccountOptions,
  // approvedTransactionOptions,
  selectedAccount,
}: PaymentSecondStepProps) => (
  <section>
    <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
      <ProgressBar totalSteps={isHard ? 3 : 4} currentStep={2} />
      <h1 className="pl-10 text-3xl font-bold text-seniorBankDarkBlue">
        {isHard ? "Trygghetskontakt vil bli varslet" : "Velg mottaker"}
      </h1>
      <div className="m-10 grid grid-cols-1 justify-between gap-1 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
        {isHard ? (
          <>
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
                placeholder="Skriv inn kontonummer her ..."
                name="paymentToAccount"
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

            {/* <SearchSelect /> */}
            <Combobox></Combobox>
          </>
        ) : (
          <>
            <section>
              <div className="grid grid-cols-1 justify-between gap-1 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
                {approvedAccountOptions.map((option, index) => (
                  <ApprovedAccountView
                    key={index}
                    title={option.title}
                    accountNumber={option.accountNumber}
                    onClick={() => onSelectAccount(option.title)}
                    isSelected={selectedAccount === option.title}
                  />
                ))}
              </div>
            </section>
          </>
        )}
        <div className="mb-8 mt-8 flex justify-between gap-4">
          <Button
            className="w-[45%] flex-col p-8 px-4 text-2xl"
            onClick={onGoBack}
          >
            Tilbake
          </Button>
          <Button
            className="w-[45%] flex-col p-8 px-4 text-2xl"
            onClick={onClick}
            disabled={isHard ? !onSelectFields : !selectedAccount}
          >
            {isHard
              ? !onSelectFields
                ? "Fyll inn feltene"
                : "Neste"
              : !selectedAccount
                ? "Du må velge en konto"
                : "Neste"}
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  </section>
);

export default PaymentSecondStep;
