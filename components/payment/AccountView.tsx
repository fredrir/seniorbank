import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  onClick: () => void;
  title: string;
  amount: number;

}

const AccountView = ({ title, amount, onClick }: Props) => {
  return (
    <div className="grid grid-cols-1 m-2 shadow-md font-bold  text-seniorBankDarkBlue text-3xl rounded-lg justify-between ">
      <Button 
        className="bg-seniorBankWhitePurple border-4 hover:border-blue-500 text-3xl hover:text-seniorbankWhite cursor-pointer group border-seniorBankWhitePurple text-seniorBankDarkBlue p-16 ps-4 flex flex-row gap-4 justify-between items-center w-full"
        onClick={onClick} 
      >
        
          <div className="flex felx-row gap-4">
            <h1 className=" ">{title}</h1>
            <h1 className="">{amount}</h1>
          </div>
          <ChevronRight className="size-16 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>
    </div>
  );
};

export default AccountView;
