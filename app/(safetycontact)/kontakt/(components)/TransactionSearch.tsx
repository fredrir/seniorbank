"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/ui/atoms/Input";
import type { JsonTransaction } from "@/model/application/mappers/JsonTransactionDTOMapper";
import type { PublicBankAccountDetails } from "@/model/domain/payment/BankAccount";
import { TransactionList } from "@/app/(seniorbank)/konto/[id]/(components)/TransactionList";

export function TransactionSearch({
  transactions,
  peerAccountDetails,
}: {
  transactions: JsonTransaction[];
  peerAccountDetails: PublicBankAccountDetails[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const peerAccount = peerAccountDetails.find(
      ({ id }) => id === transaction.peerAccountId,
    );

    return (
      peerAccount?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
    );
  });

  return (
    <>
      <div className="mb-4 mt-16 w-full px-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-700" />
          <Input
            className="w-full rounded-full border-none bg-gray-200 pl-10 text-gray-700 placeholder:text-gray-700"
            placeholder="Søk etter betalinger..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div>
          <p className="text-center text-2xl font-bold text-seniorBankDarkBlue">
            {searchTerm ? "Ingen resultater funnet" : "Ingen transaksjoner"}
          </p>
        </div>
      ) : (
        <TransactionList
          transactions={filteredTransactions}
          peerAccountDetails={peerAccountDetails}
        />
      )}
    </>
  );
}
