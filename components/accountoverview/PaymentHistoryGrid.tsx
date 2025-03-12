import PaymentHistory from "./PaymentHistory";
interface TransactionProps {
  transactions: {
    title?: string;
    description?: string;
    amount?: string;
    transactionAlert?: boolean;
    warningAlert?: boolean;
    date?: string;
    day?: string;
  }[];
}

const PaymentHistoryGrid = ({ transactions }: TransactionProps) => {

  return (
    <section className="overflow-hidden border rounded-t-2xl bg-seniorBankLightBlue">
      <div className="grid grid-cols-1">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`border-b-4 border-b-[#4D8CBF] ${transaction.warningAlert ? "bg-[#F7C6C7]" : transaction.transactionAlert ? "bg-[#70C7AA]" : "bg-seniorBankLightBlue"
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
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaymentHistoryGrid;