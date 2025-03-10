import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  className?: string;
  href?: string;
}

const HeaderText = ({ title, className, href }: Props) => {
  return (
    <span className="flex flex-row items-center group">
      {href && (
        <Link href={href}>
          <ChevronLeft className="text-white size-20 group-hover:-translate-x-1 transition-transform duration-200" />
        </Link>
      )}
      <h1 className={`text-6xl font-bold  text-white ${className}`}>{title}</h1>
    </span>
  );
};

export default HeaderText;
