"use client";

import { forwardRef } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/ui/atoms/Button";

interface Props {
  onClick: () => void;
  title: string;
  accountNumber: string;
  isSelected?: boolean;
  id?: string;
}

const ApprovedAccountView = forwardRef<HTMLButtonElement, Props>(
  ({ title, accountNumber, onClick, isSelected, id }, ref) => {
    return (
      <div
        id={id}
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
          aria-label={`Select recipient ${title} with account number ${accountNumber}`}
        >
          <div className="flex flex-row gap-4">
            <span>{title}</span>
            <span>{accountNumber}</span>
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

ApprovedAccountView.displayName = "ApprovedAccountView";

export default ApprovedAccountView;
