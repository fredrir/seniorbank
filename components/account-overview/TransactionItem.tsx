const TransactionItem = ({
  merchant,
  category,
  amount,
  type,
  bgColor = "bg-[#b3cee4]",
}: {
  merchant: string;
  category: string;
  amount: number;
  type: string;
  bgColor?: string;
}) => {
  const formattedAmount =
    type === "payment"
      ? `-${amount
          .toLocaleString("no-NO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace(".", ",")} kr`
      : `${amount
          .toLocaleString("no-NO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace(".", ",")} kr`;

  return (
    <div
      className={`${bgColor} flex w-full justify-between border-b-2 border-[#4D8CBF] px-8 py-3 text-[#001032]`}
    >
      <div>
        <p className="text-2xl font-medium">{merchant}</p>
        <p className="text-sm text-[#636363]">{category}</p>
      </div>
      <p className={`font-medium`}>{formattedAmount}</p>
    </div>
  );
};

export default TransactionItem;
