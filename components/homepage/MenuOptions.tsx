import React from "react";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const MenuOptions = ({ title, description, icon }: Props) => {
  return (
    <div className="border-4 hover:border-blue-500 cursor-pointer group rounded-2xl border-seniorBankLightBlue py-2 px-4 flex flex-row gap-2 justify-between text-seniorBankDarkBlue">
      <div className="flex flex-row gap-4">
        {icon}

        <div className="flex flex-col">
          <h1 className="text-4xl font-bold ">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <ChevronRight className="size-16 group-hover:translate-x-1 transition-transform duration-200" />
    </div>
  );
};

export default MenuOptions;
