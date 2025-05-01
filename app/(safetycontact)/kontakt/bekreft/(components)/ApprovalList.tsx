"use client";

import {
  approveTransaction,
  denyTransaction,
  listHeldTransactions,
} from "@/actions/bankAccount";
import { TransactionListData } from "@/model/application/BankAccountService";
import { useQuery } from "@tanstack/react-query";
import { Inbox } from "lucide-react";
import ApprovalCard from "../../(components)/ApprovalCard";

const ApprovalList = ({
  initialData,
}: {
  initialData: TransactionListData;
}) => {
  const {
    data: { transactions, peerAccountDetails, accountDetails },
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: listHeldTransactions,
    initialData,
  });

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col gap-8 p-4">
      {transactions.length <= 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center shadow-sm transition-all">
          <Inbox className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Ingenting å gjøre
          </h3>
          <p className="text-sm text-gray-500">
            Det er ingen elementer som venter på godkjenning for øyeblikket.
          </p>
        </div>
      ) : (
        transactions.map((transaction, index) => {
          const peerAccount = peerAccountDetails.find(
            (peer) => peer.id === transaction.peerAccountId,
          )!;
          const account = accountDetails.find(
            (acc) => acc.id === transaction.accountId,
          )!;

          const deny = async () => {
            await denyTransaction(transaction.id!, transaction.accountId);
            refetch();
          };

          const approve = async () => {
            await approveTransaction(transaction.id!, transaction.accountId);
            refetch();
          };

          return (
            <ApprovalCard
              key={index}
              recipient={peerAccount.name}
              category={peerAccount.category}
              amount={transaction.amount}
              accountName={account.name}
              date={new Date(transaction.dueDate)}
              isSuspicious={transaction.flagged}
              onApprove={approve}
              onReject={deny}
            />
          );
        })
      )}
    </div>
  );
};

export default ApprovalList;
