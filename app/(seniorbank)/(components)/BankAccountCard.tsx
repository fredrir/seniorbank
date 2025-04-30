"use client";

import type { BankAccount } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface BankAccountCardProps {
  bankAccount?: BankAccount;
}

const numberFormatter = Intl.NumberFormat("no-NB", {
  style: "currency",
  currency: "NOK",
});

export function BankAccountCard({ bankAccount }: BankAccountCardProps) {
  const [isFocused, setIsFocused] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  if (!bankAccount) {
    return null;
  }

  const balanceForScreenReader = bankAccount.balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <Link
      ref={linkRef}
      href={`/konto/${bankAccount.id}`}
      className={`group mx-24 flex w-full flex-col justify-between rounded-3xl border-4 ${
        isFocused ? "border-seniorBankDarkBlue" : "border-white"
      } bg-seniorBankLightBlue p-2 px-8 py-4 transition-all duration-200 hover:border-seniorBankDarkBlue focus:outline-none focus:ring-2 focus:ring-seniorBankDarkBlue focus:ring-offset-2 md:flex-row`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          linkRef.current?.click();
        }
      }}
      aria-labelledby={`account-name-${bankAccount.id} account-number-${bankAccount.id} account-balance-${bankAccount.id}`}
      role="button"
    >
      <div className="flex flex-col">
        <h3
          id={`account-name-${bankAccount.id}`}
          className="text-4xl font-bold text-seniorBankDarkBlue"
        >
          {bankAccount.name}
        </h3>
        <p
          id={`account-number-${bankAccount.id}`}
          className="text-3xl font-bold text-seniorBankDarkBlue"
        >
          {bankAccount.id}
        </p>
      </div>

      <div className="flex flex-col text-right">
        <h3
          id={`account-balance-${bankAccount.id}`}
          className="text-4xl font-bold text-seniorBankDarkBlue"
        >
          {numberFormatter.format(bankAccount.balance)}
          <span className="sr-only">{`${balanceForScreenReader} norske kroner`}</span>
        </h3>

        <div className="flex flex-row items-center justify-end">
          <p className="text-lg font-bold text-seniorBankDarkBlue">
            Trykk for å se konto
          </p>
          <ChevronRight
            className="text-seniorBankDarkBlue transition-transform duration-200 group-hover:translate-x-1 group-focus:translate-x-1"
            size={32}
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
