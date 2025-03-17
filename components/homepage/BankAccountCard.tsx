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
    <Link
      href={props.href}
      className="group mx-24 flex w-full flex-col justify-between rounded-3xl border-4 border-white bg-seniorBankLightBlue p-2 px-8 py-4 md:flex-row"
    >
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-seniorBankDarkBlue md:text-4xl">
          {props.title}
        </h3>
        <p className="md:textl-3xl text-lg font-bold text-seniorBankDarkBlue">
          {props.accountNumber}
        </p>
      </div>

      <div className="flex flex-col text-right">
        <h3 className="text-2xl font-bold text-seniorBankDarkBlue md:text-4xl">
          {numberFormatter.format(props.balance)}
        </h3>

        <div className="flex flex-row items-center justify-end">
          <p className="text-lg font-bold text-seniorBankDarkBlue">
            Trykk for å se konto
          </p>
          <ChevronRight
            className="text-seniorBankDarkBlue transition-transform duration-200 group-hover:translate-x-1"
            size={32}
          />
        </div>
      </div>
    </Link>
  );
}
