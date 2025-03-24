import { BankAccount } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BankAccoundCardProps {
  bankAccount?: BankAccount;
}

const numberFormatter = Intl.NumberFormat("no-NB", {
  style: "currency",
  currency: "NOK",
});

export function BankAccountCard({ bankAccount }: BankAccoundCardProps) {
  if (!bankAccount) {
    return null;
  }

  return (
    <div className="mx-24 flex w-full justify-between rounded-3xl border-4 border-white bg-seniorBankLightBlue p-2 px-8 py-4">
      <div className="flex flex-col">
        <h3 className="text-4xl font-bold text-seniorBankDarkBlue">
          {bankAccount.name}
        </h3>
        <p className="text-3xl font-bold text-seniorBankDarkBlue">
          {bankAccount.id}
        </p>
      </div>

      <div className="flex flex-col text-right">
        <h3 className="text-4xl font-bold text-seniorBankDarkBlue">
          {numberFormatter.format(bankAccount.balance)}
        </h3>

        <Link href={`/konto/${bankAccount.id}`}>
          <div className="flex flex-row items-center justify-end">
            <p className="text-lg font-bold text-seniorBankDarkBlue">
              Trykk for å se konto
            </p>
            <ChevronRight className="text-seniorBankDarkBlue" size={32} />
          </div>
        </Link>
      </div>
    </div>
  );
}
