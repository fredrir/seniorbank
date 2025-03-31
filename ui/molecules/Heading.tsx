import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props extends React.PropsWithChildren {
  title: string;
  className?: string;
  href?: string;
}

const Heading = ({ title, className, href, children }: Props) => {
  return (
    <div className="group flex flex-row items-center bg-inherit">
      {href && (
        <Link href={href}>
          <ChevronLeft
            className={"size-20 transition-transform duration-200 group-hover:-translate-x-1 text-white"}
          />
        </Link>
      )}
      <div className="flex flex-col">
        <h1
          className={cn("text-4xl font-bold md:text-6xl text-white mb-2", className)}
        >
          {title}
        </h1>
        {children}
      </div>

    </div>
  );
};

export default Heading;
