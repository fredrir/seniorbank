"use client";

import { forwardRef } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/ui/atoms/Button";

interface Props {
  onClick: () => void;
  title: string;
  amount: number;
  isSelected?: boolean;
  id?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const PaymentAccountCard = forwardRef<HTMLButtonElement, Props>(
  ({ title, amount, onClick, isSelected, id, onKeyDown }, ref) => {
    return (
      <div
        id={id}
        onKeyDown={onKeyDown}
        className="m-2 grid grid-cols-1 justify-between rounded-lg text-3xl font-bold text-seniorBankDarkBlue shadow-md"
      >
        <Button
          ref={ref}
          className={`group flex w-full cursor-pointer flex-row items-center justify-between gap-4 border-4 border-seniorBankWhitePurple p-16 ps-4 text-3xl text-seniorBankDarkBlue hover:border-blue-500 hover:text-seniorbankWhite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
            isSelected
              ? "border-seniorBankGreen bg-seniorBankGreen text-white"
              : "bg-seniorBankWhitePurple"
          } `}
          onClick={onClick}
          aria-pressed={isSelected}
          aria-label={`Select account ${title} with balance ${amount}`}
        >
          <div className="flex flex-row gap-4">
            <span>{title}</span>
            <span>{amount}</span>
          </div>
          <ChevronRight
            className="size-16 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Button>
      </div>
    );
  },
);

PaymentAccountCard.displayName = "PaymentAccountCard";

export default PaymentAccountCard;
