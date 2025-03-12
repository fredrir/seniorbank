import React from "react";
import Alert from "./Alert";

interface Props {
  title?: string;
  description?: string;
  amount?: string;
  transactionAlert?: boolean;
  warningAlert?: boolean;
  date?: string;
  day?: string;
}

const PaymentHistory = ({ title, description, amount, transactionAlert, warningAlert, date, day }: Props) => {
  return (
    <section className="flex flex-col w-full p-4 text-[#001032]">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl">{title}</h2>
          {description && <p className="text-gray-500 font-bold text-2xl">{description}</p>}
          {day && <p className="text-gray-500 text-2xl font-bold">{day}</p>}
        </div>
        <div>
          {amount && <p className="text-4xl font-bold">{amount}</p>}
          {date && <p className="text-gray-500 text-2xl font-bold">{date}</p>}
        </div>
      </header>
      {warningAlert && (
        <div className="flex justify-center mt-2">
          <Alert />
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;