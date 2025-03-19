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
  alertMessage?: string;
}

const PaymentHistory = ({
  title,
  description,
  amount,
  transactionAlert,
  warningAlert,
  date,
  day,
  alertMessage,
}: Props) => {
  return (
    <section className="flex w-full flex-col p-4 text-[#001032]">
      <header className="flex w-full items-center justify-between md:flex-row">
        <div>
          <h2 className="text-2xl md:text-4xl">{title}</h2>
          {description && (
            <p className="txt-lg font-bold text-gray-500 md:text-2xl">
              {description}
            </p>
          )}
          {day && (
            <p className="text-lg font-bold text-gray-500 md:text-2xl">{day}</p>
          )}
        </div>
        <div className="">
          {amount && (
            <p className="whitespace-nowrap text-2xl font-bold md:text-4xl">
              {amount}
            </p>
          )}
          {date && (
            <p className="text-lg font-bold text-gray-500 md:text-2xl">
              {date}
            </p>
          )}
        </div>
      </header>
      {warningAlert && alertMessage && (
        <div className="mt-2 flex justify-center">
          <Alert message={alertMessage} />
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;
