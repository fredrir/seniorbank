import { ProgressBar } from "@/ui/organisms/ProgressBar";
import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import { PropsWithChildren } from "react";
import { PaymentFormData } from "../../types";
import { PaymentFormNavbar } from "../PaymentFormButton";
import { PublicBankAccountDetails } from "@/model/domain/payment/BankAccount";

interface PaymentThirdStepProps {
  accounts: JsonBankAccount[];
  onStepCompleted: (data: object) => void;
  peerAccounts: PublicBankAccountDetails[];
  onGoBack: () => void;
  formData: Partial<PaymentFormData>;
}

function Field({ children, label }: PropsWithChildren<{ label: string }>) {
  return (
    <>
      <p>{label}:</p>
      <div className="flex h-20 w-full items-center justify-between rounded-lg border-2 border-seniorBankDarkBlue bg-seniorbankWhite p-4">
        {children}
      </div>
    </>
  );
}

const PaymentThirdStep = ({
  onStepCompleted,
  onGoBack,
  accounts,
  peerAccounts,
  formData,
}: PaymentThirdStepProps) => {
  const isHard = true;

  const fromAccount = accounts.find(
    (account) => account.id === formData.fromAccountId,
  );
  const toAccount = peerAccounts.find(
    (account) => account.id === formData.toAccountId,
  );
  return (
    <section>
      <div className="mt-6 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple">
        <h1 className="pl-10 text-3xl font-bold text-seniorBankDarkBlue">
          {isHard ? "Bekreft betaling" : "Beløp"}
        </h1>
        <div className="m-10 grid grid-cols-1 gap-3 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
          <div className="mb-6 flex w-full items-center justify-between">
            <p>Du er i ferd med å betale:</p>
            <p className="items-center text-3xl">{formData.amount} kr</p>
          </div>

          <Field label="Fra konto">{fromAccount?.name}</Field>
          <Field label="Til konto">{toAccount?.name}</Field>
          <Field label="Kommentar">{formData.comment}</Field>
        </div>
        <PaymentFormNavbar
          onGoBack={onGoBack}
          onGoForward={() => onStepCompleted({})}
        >
          Neste
        </PaymentFormNavbar>
      </div>
    </section>
  );
};

export default PaymentThirdStep;
