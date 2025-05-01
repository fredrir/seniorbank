"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, Inbox } from "lucide-react";
import ApprovalCard from "./ApprovalCard";
import { useQuery } from "@tanstack/react-query";
import {
  approveTransaction,
  denyTransaction,
  listHeldTransactions,
} from "@/actions/bankAccount";
import { TransactionListData } from "@/model/application/BankAccountService";
import { mod } from "@/lib/utils";

export default function ApprovalCarousel({
  initialTransactions,
}: {
  initialTransactions: TransactionListData;
}) {
  const {
    data: { transactions, accountDetails, peerAccountDetails },
    refetch,
  } = useQuery({
    queryKey: ["approvals"],
    queryFn: listHeldTransactions,
    initialData: initialTransactions,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle case when there are no approvals
  if (transactions.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center p-4 pt-16">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center shadow-sm transition-all">
            <Inbox className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Ingenting å fjerne
            </h3>
            <p className="text-sm text-gray-500">
              Det er ingen elementer som venter på godkjenning for øyeblikket.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const transaction = transactions[currentIndex];
  const peerAccount = peerAccountDetails.find(
    (peer) => peer.id === transaction.peerAccountId,
  )!;
  const account = accountDetails.find(
    (acc) => acc.id === transaction.accountId,
  )!;

  const goToPrevious = () =>
    setCurrentIndex((index) => mod(index - 1, transactions.length));

  const goToNext = () =>
    setCurrentIndex((index) => mod(index + 1, transactions.length));

  const deny = async () => {
    await denyTransaction(transaction.id!, transaction.accountId);
    refetch();
  };

  const approve = async () => {
    console.log("Approving", transaction.id);
    await approveTransaction(transaction.id!, transaction.accountId);
    refetch();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 pt-16">
      <div className="flex h-80 w-full max-w-md flex-col justify-between">
        <div>
          <h2 className="mb-4 text-center text-lg font-bold text-blue-900 md:text-xl">
            Venter på godkjenning:
          </h2>

          <ApprovalCard
            recipient={peerAccount.name}
            amount={transaction.amount}
            category={peerAccount.category}
            accountName={account.name}
            date={new Date(transaction.dueDate)}
            isSuspicious={transaction.flagged}
            onReject={deny}
            onApprove={approve}
          />
        </div>

        {transactions.length > 1 && (
          <div className="flex justify-between">
            <button
              className="text-blue-900 transition-colors hover:text-blue-700"
              onClick={goToPrevious}
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div className="flex gap-1">
              {transactions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-blue-900" : "bg-gray-300"}`}
                />
              ))}
            </div>
            <button
              className="text-blue-900 transition-colors hover:text-blue-700"
              onClick={goToNext}
            >
              <ArrowRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
