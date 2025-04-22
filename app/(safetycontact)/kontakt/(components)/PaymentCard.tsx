interface PaymentProps {
  payment: {
    id: string;
    date: string;
    amount: number;
    recipient: string;
    status: "Godkjent" | "Avvist" | "Venter";
  };
}

export default function PaymentCard({ payment }: PaymentProps) {
  const getBorderColor = () => {
    switch (payment.status) {
      case "Godkjent":
        return "border-l-green-500";
      case "Avvist":
        return "border-l-red-500";
      case "Venter":
        return "border-l-blue-500";
      default:
        return "border-l-gray-300";
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div
      className={`border-l-4 p-4 ${getBorderColor()} bg-[#F2F2F9] shadow-lg hover:bg-gray-50`}
    >
      <div className="space-y-1">
        <div className="flex items-center">
          <span className="text-sm font-bold text-seniorBankDarkBlue">
            Dato:
          </span>
          <span className="ml-2 text-sm text-seniorBankDarkBlue">
            {payment.date}
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-bold text-seniorBankDarkBlue">
            Beløp:
          </span>
          <span className="ml-2 text-sm text-seniorBankDarkBlue">
            {formatAmount(payment.amount)} kr
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-bold text-seniorBankDarkBlue">
            Mottaker:
          </span>
          <span className="ml-2 text-sm text-seniorBankDarkBlue">
            {payment.recipient}
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-bold text-seniorBankDarkBlue">
            Status:
          </span>
          <span className="ml-2 text-sm text-seniorBankDarkBlue">
            {payment.status}
          </span>
        </div>
      </div>
    </div>
  );
}
