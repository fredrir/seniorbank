import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  className?: string;
  href?: string;
  blue?: boolean;
}

const Heading = ({ title, className, href, blue = false }: Props) => {
  const textColor = blue ? "text-[#002776]" : "text-white";

  return (
    <div className="group flex flex-row items-center bg-inherit">
      {href && (
        <Link href={href}>
          <ChevronLeft
            className={`size-20 ${textColor} transition-transform duration-200 group-hover:-translate-x-1`}
          />
        </Link>
      )}
      <h1
        className={`text-4xl font-bold ${textColor} md:text-6xl ${className}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default Heading;
