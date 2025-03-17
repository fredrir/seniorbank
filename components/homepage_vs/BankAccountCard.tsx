import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BankAccoundCardProps {
  title: string;
  accountNumber: string;
  balance: number;
  href: string;
}

const numberFormatter = Intl.NumberFormat("no-NB", {
  style: "currency",
  currency: "NOK",
});

export function BankAccountCard(props: BankAccoundCardProps) {
  return (
    <div className="bg-seniorBankLightBlue w-full flex mx-24 justify-between border-4 p-2 border-white rounded-3xl px-8 py-4">
      <div className="flex flex-col">
        <h3 className="text-4xl font-bold text-seniorBankDarkBlue">
          {props.title}
        </h3>
        <p className="text-3xl font-bold text-seniorBankDarkBlue">
          {props.accountNumber}
        </p>
      </div>

      <div className="flex flex-col text-right">
        <h3 className="text-4xl font-bold text-seniorBankDarkBlue">
          {numberFormatter.format(props.balance)}
        </h3>

        <Link href={props.href}>
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
