import { TransactionDetails } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { cva } from "class-variance-authority";

type TransactionItemProps = {
  transaction: TransactionDetails
  direction: "incoming" | "outgoing"
};

const transactionItemVariants = cva(
  "flex w-full justify-between border-b-2 border-[#4D8CBF] px-8 py-3 text-[#001032]",
  {
    variants: {
      direction: {
        incoming: "bg-[#70c7aa]",
        outgoing: "bg-[#b3cee4]"
      }
    }
  }
)

const TransactionItem = ({ transaction, direction }: TransactionItemProps) => {
  const peerAccount = direction === "incoming" ? transaction.fromAccount : transaction.toAccount;
  const balanceChange = direction === "incoming" ? transaction.amount : -transaction.amount;

  return (
    <div className={transactionItemVariants({ direction })}>
      <div>
        <p className="text-2xl font-bold">{peerAccount.name}</p>
        <p className="text-md font-medium text-[#636363]">{peerAccount.category}</p>
      </div>
      <p className={`font-bold`}>{formatCurrency(balanceChange, true)}</p>
    </div>
  );
};

export default TransactionItem;
