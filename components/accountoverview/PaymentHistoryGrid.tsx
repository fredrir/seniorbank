import PaymentHistory from "./PaymentHistory";

const PaymentHistoryGrid = () => {
  const transactions = [
    {
      title: "Rema 1000",
      description: "Dagligvare",
      amount: "-826.87 kr",
    },
    {
      title: "SIT kantine",
      description: "Dagligvare",
      amount: "-45.87 kr",
    },
    {
      title: "Transaksjon",
      description: "Transaksjon",
      amount: "14000.00 kr",
      transactionAlert: true,
    },
    {
      title: "Joker Stud.samf.",
      description: "Dagligvare",
      amount: "-72.46 kr",
    },
    {
      description: "Onsdag",
      date: "03 Januar 2025",
    },
    {
      title: "Klippers",
      description: "Kosmetikk",
      amount: "-599.00 kr",
    },
    {
      title: "Nigerian Prince",
      description: "Kosmetikk",
      amount: "-59999.00 kr",
      warningAlert: true,
    },
  ];

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