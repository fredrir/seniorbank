import PaymentHistory from "./PaymentHistory";
interface TransactionProps {
  transactions: {
    title?: string;
    description: string;
    amount?: string;
    transactionAlert?: boolean;
    warningAlert?: boolean;
    date?: string;
  }[];
}

const PaymentHistoryGrid = ( {transactions}: TransactionProps) => {

  return (
    <section className="overflow-hidden border rounded-t-2xl bg-seniorBankLightBlue">
      <div className="grid grid-cols-1">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`border-b-4 border-b-seniorbankBlue ${transaction.warningAlert ? "bg-red-300" : transaction.transactionAlert ? "bg-green-300" : "bg-seniorBankLightBlue"
              }`}
          >
            <div className="">
              <PaymentHistory
                title={transaction.title}
                description={transaction.description}
                amount={transaction.amount}
                transactionAlert={transaction.transactionAlert}
                warningAlert={transaction.warningAlert}
                date={transaction.date}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaymentHistoryGrid;