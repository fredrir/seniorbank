import TransactionItem from "./TransactionItem";
import { TransactionListDateDivider } from "./TransactionListDateDivider";
import React from "react";
import { JsonTransaction } from "@/model/application/mappers/JsonTransactionDTOMapper";
import { PublicBankAccountDetails } from "@/model/domain/payment/BankAccount";
export function TransactionList({
  transactions,
  peerAccountDetails,
}: {
  transactions: JsonTransaction[];
  peerAccountDetails: PublicBankAccountDetails[];
}) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-3xl">
      {transactions.map((transaction, index, array) => {
        const peerAccount = peerAccountDetails.find(
          ({ id }) => id === transaction.peerAccountId,
        )!;

        // If this transaction is on a different date than the previous one (and is not the first), we add a divider
        const needsDivider =
          index !== 0 &&
          new Date(transaction.dueDate).getDate() !==
            new Date(array[index - 1].dueDate).getDate();

        const amount =
          transaction.direction === "INBOUND"
            ? transaction.amount
            : -transaction.amount;

        return (
          <React.Fragment key={transaction.id}>
            {needsDivider && (
              <TransactionListDateDivider
                date={new Date(transaction.dueDate)}
              />
            )}

            <TransactionItem
              type={transaction.direction}
              title={peerAccount.name}
              category={peerAccount.category ?? undefined}
              amount={amount}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
