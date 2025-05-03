"use client";

import { PaymentFormData } from "../../types";
import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import { PaymentFormNavbar } from "../PaymentFormButton";
import { PublicBankAccountDetails } from "@/model/domain/payment/BankAccount";

interface PaymentConfirmationStepProps {
  onStepCompleted: (data: object) => void;
  peerAccounts: PublicBankAccountDetails[];
  accounts: JsonBankAccount[];
  formData: Partial<PaymentFormData>;
  onGoBack: () => void;
}

const PaymentConfirmationStep = ({
  formData,
  accounts,
  peerAccounts,
  onGoBack,
}: PaymentConfirmationStepProps) => {
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
        <h1 className="ml-10 text-3xl font-bold text-seniorBankDarkBlue">
          {isHard ? "Betalingskvittering" : "Bekreft betaling"}
        </h1>

        <div className="flex text-3xl">
          <div className="ml-10 mr-10 mt-4 grid w-full grid-cols-1 content-end gap-3 rounded-lg border-2 border-seniorBankDarkBlue bg-seniorbankWhite p-4 font-bold text-seniorBankDarkBlue">
            <div>
              <p>Betalt sum:</p>
              <p className="mb-6 mt-4 indent-4">{formData.amount} kr</p>
            </div>
            <div>
              <p>Fra konto:</p>
              <p className="mb-6 mt-4 indent-4">{fromAccount?.name}</p>
            </div>
            <div>
              <p>Til konto:</p>
              <p className="mb-6 mt-4 indent-4">{toAccount?.name}</p>
            </div>
            <div>
              <p>Kommentar:</p>
              <p className="mb-6 mt-4 indent-4">{formData.comment}</p>
            </div>
          </div>
        </div>

        <PaymentFormNavbar
          onGoBack={onGoBack}
          onGoForward={() => (window.location.href = "/")}
        >
          Ferdig
        </PaymentFormNavbar>
      </div>
    </section>
  );
};

export default PaymentConfirmationStep;
