import PaymentHistory from "./PaymentHistoryItem";
interface TransactionProps {
  transactions: {
    title?: string;
    description?: string;
    amount?: string;
    transactionAlert?: boolean;
    warningAlert?: boolean;
    date?: string;
    day?: string;
    alertMessage?: string;
  }[];
}

const PaymentHistoryGrid = ({ transactions }: TransactionProps) => {
  return (
    <section className="overflow-hidden rounded-t-2xl border border-seniorBankLightBlue bg-seniorBankLightBlue">
      <div className="">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`border-b-4 border-b-[#4D8CBF] ${
              transaction.warningAlert
                ? "bg-[#F7C6C7]"
                : transaction.transactionAlert
                  ? "bg-[#70C7AA]"
                  : "bg-seniorBankLightBlue"
            }`}
          >
            <PaymentHistory
              title={transaction.title}
              description={transaction.description}
              amount={transaction.amount}
              transactionAlert={transaction.transactionAlert}
              warningAlert={transaction.warningAlert}
              date={transaction.date}
              day={transaction.day}
              alertMessage={transaction.alertMessage}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaymentHistoryGrid;
