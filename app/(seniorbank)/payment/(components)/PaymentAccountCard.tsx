import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface Props {
  onClick: () => void;
  title: string;
  amount: number;

}

const PaymentAccountCard = ({ title, amount, onClick }: Props) => {
  return (
    <Button 
      className="bg-seniorBankWhitePurple hover:border-blue-500 text-3xl hover:text-seniorbankWhite cursor-pointer text-seniorBankDarkBlue p-12 ps-4 flex flex-row justify-between"
      onClick={onClick} 
    >
      
        <div className="flex felx-row gap-4">
          <h1 className=" ">{title}</h1>
          <h1 className="">{amount}</h1>
        </div>
        <ChevronRight className="size-16 group-hover:translate-x-1 transition-transform duration-200" />
    </Button>
  );
};

export default PaymentAccountCard;
