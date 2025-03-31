import { TransactionDetails } from "@/lib/types";
import TransactionItem from "./TransactionItem";
import { TransactionListDateDivider } from "./TransactionListDateDivider";
import { User } from "@prisma/client";
import React from "react";

export function TransactionList({ transactions, user }: { transactions: TransactionDetails[], user: User }) {
  return <div className="flex w-full flex-col rounded-3xl overflow-hidden">
    {
      transactions.map((transaction, index, array) => {
        const isIncoming = transaction.fromAccount.userId === user.id;

        // If this transaction is on a different date than the previous one (and is not the first), we add a divider
        const needsDivider = index !== 0 && transaction.dueDate.getDate() !== array[index - 1].dueDate.getDate();

        const amount = isIncoming ? transaction.amount : -transaction.amount;
        const peerAccount = isIncoming ? transaction.fromAccount : transaction.toAccount;

        return <React.Fragment key={transaction.id}>
          {
            needsDivider &&
              <TransactionListDateDivider date={transaction.dueDate} />
          }

          <TransactionItem
            type={isIncoming ? "incoming" : "outgoing"}
            title={peerAccount.name}
            category={peerAccount.category ?? undefined}
            amount={amount}
            />
        </React.Fragment>
      })
    }
  </div>
}
