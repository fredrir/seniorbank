import { formatCurrency } from "@/lib/utils";
import type { BankAccount } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  account: BankAccount;
}

const AccountCard = ({ account }: Props) => {
  return (
    <Link
      href={`/konto/${account.id}`}
      className="group flex w-full items-center justify-between border-b-[0.4rem] border-seniorBankLightBlue p-6 transition-colors last:border-b-0 hover:bg-seniorBankLightBlue/10 focus:bg-seniorBankLightBlue/10 focus:outline-none focus:ring-2 focus:ring-seniorBankDarkBlue focus:ring-offset-2"
      aria-label={`${account.name}: ${formatCurrency(account.balance)}`}
    >
      <h3 className="text-xl font-bold text-seniorBankDarkBlue md:text-2xl lg:text-3xl">
        {account.name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-seniorBankDarkBlue md:text-2xl">
          {formatCurrency(account.balance)}
        </span>

        <ChevronRight
          className="h-6 w-6 text-seniorBankDarkBlue transition-transform duration-200 group-hover:translate-x-1 group-focus:translate-x-1 md:h-8 md:w-8"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
};

export default AccountCard;
