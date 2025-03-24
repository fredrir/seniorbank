import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  className?: string;
  href?: string;
}

const HeaderText = ({ title, className, href }: Props) => {
  return (
    <span className="group flex flex-row items-center">
      {href && (
        <Link href={href}>
          <ChevronLeft className="size-20 text-white transition-transform duration-200 group-hover:-translate-x-1" />
        </Link>
      )}
      <h1 className={`text-4xl font-bold text-white md:text-6xl ${className}`}>
        {title}
      </h1>
    </span>
  );
};

export default HeaderText;
