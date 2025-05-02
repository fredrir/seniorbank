"use client";

import PaymentAccountCard from "../PaymentAccountCard";
import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import { PaymentFormData } from "../../types";
import { PaymentFormNavbar } from "../PaymentFormButton";

interface PaymentFirstStepProps {
  accounts: JsonBankAccount[];
  onStepCompleted: (data: { fromAccountId: string }) => void;
  formData: Partial<PaymentFormData>;
}

const PaymentFirstStep = ({
  onStepCompleted,
  accounts: accountOptions,
  formData,
}: PaymentFirstStepProps) => {
  return (
    <>
      <h1 className="pb-8 text-3xl font-bold text-seniorBankDarkBlue">
        Velg konto du vil betale fra:{" "}
      </h1>
      <div className="grid grid-cols-1 justify-between gap-6 rounded-lg text-3xl font-bold text-seniorBankDarkBlue">
        {accountOptions.map((option, index) => (
          <PaymentAccountCard
            key={index}
            title={option.name}
            amount={option.balance}
            onClick={() => onStepCompleted({ fromAccountId: option.id })}
            isSelected={formData.fromAccountId === option.id}
          />
        ))}
      </div>
      <PaymentFormNavbar
        hideBackButton
        problem={formData.fromAccountId ? undefined : "Du må velge en konto"}
      >
        Tilbake
      </PaymentFormNavbar>
    </>
  );
};

export default PaymentFirstStep;
