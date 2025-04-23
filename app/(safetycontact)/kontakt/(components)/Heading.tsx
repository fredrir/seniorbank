import type React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props extends React.PropsWithChildren {
  title: string;
  className?: string;
  href?: string;
}

const Heading = ({ title, className, href }: Props) => {
  return (
    <div className={`group flex items-center bg-inherit ${className}`}>
      {href && (
        <Link href={href} className="flex items-center">
          <ChevronLeft className="size-12 text-[#002776] transition-transform duration-200 group-hover:-translate-x-1" />
        </Link>
      )}

      <h1 className={cn("text-2xl font-bold text-[#002776] md:text-4xl")}>
        {title}
      </h1>
    </div>
  );
};

export default Heading;
