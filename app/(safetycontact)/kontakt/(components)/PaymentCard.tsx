import { ApprovalStatus } from "@/model/domain/payment/Transaction";

interface PaymentProps {
  date: Date;
  amount: number;
  recipient: string;
  status: ApprovalStatus;
}

function statusLabel(status: ApprovalStatus): string {
  switch (status) {
    case "APPROVED":
      return "Godkjent";
    case "DENIED":
      return "Avslått";
    case null:
      return "Venter";
  }
}

export default function PaymentCard({
  date,
  amount,
  recipient,
  status,
}: PaymentProps) {
  const getBorderColor = () => {
    switch (status) {
      case "APPROVED":
        return "border-l-green-500";
      case "DENIED":
        return "border-l-red-500";
      case null:
        return "border-l-blue-500";
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
            {date.toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-bold text-seniorBankDarkBlue">
            Beløp:
          </span>
          <span className="ml-2 text-sm text-seniorBankDarkBlue">
            {formatAmount(amount)} kr
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-bold text-seniorBankDarkBlue">
            Mottaker:
          </span>
          <span className="ml-2 text-sm text-seniorBankDarkBlue">
            {recipient}
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-bold text-seniorBankDarkBlue">
            Status:
          </span>
          <span className="ml-2 text-sm text-seniorBankDarkBlue">
            {statusLabel(status)}
          </span>
        </div>
      </div>
    </div>
  );
}
