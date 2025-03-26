import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string; //TODO currently optional, but should be required
}

const MenuOption = ({ title, description, icon, href = "/" }: Props) => {
  return (
    <Link
      href={href}
      className="group flex cursor-pointer flex-row justify-between gap-2 rounded-2xl border-4 border-seniorBankLightBlue px-4 py-2 text-seniorBankDarkBlue hover:border-blue-500"
    >
      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-center justify-center">{icon}</div>

        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-start text-2xl font-bold">{title}</h1>
          <p className="text-start text-gray-600">{description}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <ChevronRight className="size-16 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default MenuOption;
