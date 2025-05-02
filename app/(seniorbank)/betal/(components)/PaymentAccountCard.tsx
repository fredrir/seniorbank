"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/ui/atoms/Button";

interface Props {
  onClick: () => void;
  title: string;
  amount: number;
  isSelected?: boolean;
}

const PaymentAccountCard = ({ title, amount, onClick, isSelected }: Props) => {
  return (
    <div className="grid grid-cols-1 justify-between rounded-lg text-3xl font-bold text-seniorBankDarkBlue shadow-md">
      <Button
        className={`group flex w-full cursor-pointer flex-row items-center justify-between gap-4 border-4 border-seniorBankWhitePurple p-16 ps-4 text-3xl text-seniorBankDarkBlue hover:border-blue-500 hover:text-seniorbankWhite ${isSelected ? "border-seniorBankGreen bg-seniorBankGreen text-white" : "bg-seniorBankWhitePurple"} `}
        onClick={onClick}
      >
        <div className="felx-row flex gap-4">
          <h1 className=" ">{title}</h1>
          <h1 className="">{amount}</h1>
        </div>
        <ChevronRight className="size-16 transition-transform duration-200 group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default PaymentAccountCard;
