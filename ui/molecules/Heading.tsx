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
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          {href && (
            <Link href={href}>
              <ChevronLeft
                className={
                  "size-20 text-white transition-transform duration-200 group-hover:-translate-x-1"
                }
              />
            </Link>
          )}
          <h1
            className={cn(
              "mb-2 text-4xl font-bold text-white md:text-6xl",
              className,
            )}
          >
            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Heading;
