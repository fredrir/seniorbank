import { formatCurrency } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const transactionItemVariants = cva(
  "flex w-full justify-between border-b-2 border-[#4D8CBF] py-4 px-8 text-[#001032]",
  {
    variants: {
      type: {
        INBOUND: "bg-[#70c7aa]",
        OUTBOUND: "bg-[#b3cee4]",
      },
    },
  },
);

type TransactionItemProps = VariantProps<typeof transactionItemVariants> & {
  title: string;
  category?: string;
  amount: number;
};

const TransactionItem = ({
  title,
  category,
  amount,
  ...cvaProps
}: TransactionItemProps) => {
  return (
    <div className={transactionItemVariants({ ...cvaProps })}>
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-md font-medium text-[#636363]">{category}</p>
      </div>
      <p className={`font-bold`}>{formatCurrency(amount, true)}</p>
    </div>
  );
};

export default TransactionItem;
