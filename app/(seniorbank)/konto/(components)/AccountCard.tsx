import React from "react";
import { formatCurrency } from "@/lib/utils";
import { BankAccount } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  account: BankAccount;
}

const AccountCard = ({ account }: Props) => {
  return (
    <Link
      href={`/konto/${account.id}`}
      className="group flex w-full items-center justify-between border-b-[0.4rem] border-seniorBankLightBlue p-6 last:border-b-0"
    >
      <h3 className="text-2xl font-bold text-seniorBankDarkBlue lg:text-3xl">
        {account.name}
      </h3>
      <div className="flex items-center">
        <h3 className="text-2xl font-bold text-seniorBankDarkBlue">
          {formatCurrency(account.balance)}
        </h3>

        <ChevronRight className="size-10 text-seniorBankDarkBlue transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default AccountCard;
