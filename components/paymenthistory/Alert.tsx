import React from "react";
import { TriangleAlert } from "lucide-react";

interface AlertProps {
  message: string;
}

const Alert = ({ message }: AlertProps) => {
  return (
    <div className="flex flex-row items-center gap-4 text-[#001032]">
      <TriangleAlert className="w-14 h-14 md:w-16 md:h-16" />
      <div className="flex max-w-md flex-col break-words text-xl md:text-2xl">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
