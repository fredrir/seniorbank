import { BankAccount } from "@/lib/types";
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
      href={`/konto/${account.accountNumber}`}
      key={index}
      className={`border-seniorBankLightBlue group w-full flex items-center justify-between py-6 px-4 ${
        index === 0
          ? "border-b-[0.4rem]"
          : index === length - 1
          ? ""
          : "border-b-[0.4rem]"
      }`}
    >
      <h3 className="text-seniorBankDarkBlue text-2xl lg:text-3xl font-bold">
        {account.title}
      </h3>
      <div className="flex  items-center">
        <h3 className="text-seniorBankDarkBlue text-xl lg:text-2xl font-bold">
          {account.balance}
        </h3>

        <ChevronRight className="text-seniorBankDarkBlue size-12 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
};

export default AccountCard;
