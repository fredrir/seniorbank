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
      className={`${bgColor} px-8 w-full border-[#4D8CBF] border-b-2 text-[#001032] py-3 flex justify-between`}
    >
      <div>
        <p className="font-medium text-2xl">{merchant}</p>
        <p className="text-sm text-[#636363]">{category}</p>
      </div>
      <p className={`font-medium `}>{formattedAmount}</p>
    </div>
  );
};

export default TransactionItem;
