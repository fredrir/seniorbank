import { formatCurrency } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const accounts = [
  {
    name: "Sparekonto",
    amount: 830726,
    accountNumber: "1234 56 78901",
  },

  {
    name: "Barnebarn",
    amount: 34835,
    accountNumber: "1234 56 78902",
  },

  {
    name: "Russetid",
    amount: 10835,
    accountNumber: "1234 56 78903",
  },
];

const AccountOverview = () => {
  return (
    <div className="flex flex-col rounded-3xl bg-seniorbankWhite">
      {accounts.map((account) => (
        <Link
          href={`/kontakt/konto/${account.accountNumber}`}
          key={account.accountNumber}
          className={`group flex cursor-pointer flex-row items-center justify-between border-b border-b-gray-300 px-4 py-6 last:border-b-0`}
        >
          <h3 className="text-lg font-bold text-[#002776] md:text-xl">
            {account.name}
          </h3>

          <div className="flex flex-row items-center gap-1">
            <span className="text-lg font-bold text-seniorBankDarkBlue">
              {formatCurrency(account.amount, true)}
            </span>

            <ChevronRight className="size-12 text-seniorBankDarkBlue transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AccountOverview;
