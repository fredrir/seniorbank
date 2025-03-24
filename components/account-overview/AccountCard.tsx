import { BankAccount } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  account: BankAccount;
  index: number;
  length: number;
}

const AccountCard = ({ account, index, length }: Props) => {
  return (
    <Link
      href={`/konto/${account.id}`}
      key={index}
      className={`group flex w-full items-center justify-between border-seniorBankLightBlue px-4 py-6 ${
        index === 0
          ? "border-b-[0.4rem]"
          : index === length - 1
            ? ""
            : "border-b-[0.4rem]"
      }`}
    >
      <h3 className="text-2xl font-bold text-seniorBankDarkBlue lg:text-3xl">
        {account.name}
      </h3>
      <div className="flex items-center">
        <h3 className="text-xl font-bold text-seniorBankDarkBlue">
          {account.balance.toLocaleString("nb-NO", {
            style: "currency",
            currency: "NOK",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </h3>

        <ChevronRight className="size-10 text-seniorBankDarkBlue transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default AccountCard;
