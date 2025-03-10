import React from "react";
import Alert from "./Alert";

interface Props {
  title?: string;
  description: string;
  amount?: string;
  transactionAlert?: boolean;
  warningAlert?: boolean;
  date?: string;
}

const PaymentHistory = ({ title, description, amount, transactionAlert, warningAlert, date }: Props) => {
  return (
    <div className="flex flex-row justify-between p-4 items-center text-[#001032]">
      <div>
        <h2 className="text-5xl">{title}</h2>
        <p className="text-gray-500 font-bold text-3xl">{description}</p>
      </div>
      {warningAlert && (
        <Alert />
      )}
      <div>
        {amount && <p className="text-5xl font-bold">{amount}</p>}
        {date && <p className="text-gray-500 text-3xl">{date}</p>}
      </div>
    </div>
  );
};

export default PaymentHistory;