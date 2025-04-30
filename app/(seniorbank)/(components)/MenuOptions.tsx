import type React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useId } from "react";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string; //TODO currently optional, but should be required
}

const MenuOption = ({ title, description, icon, href = "/" }: Props) => {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Link
      href={href}
      className="group flex cursor-pointer flex-row justify-between gap-2 rounded-2xl border-4 border-seniorBankLightBlue px-4 py-2 text-seniorBankDarkBlue transition-colors hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      role="menuitem"
    >
      <div className="flex flex-row gap-4">
        <div
          className="flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          {icon}
        </div>

        <div className="flex flex-col justify-center gap-1">
          <h2 id={titleId} className="text-start text-xl font-bold sm:text-2xl">
            {title}
          </h2>
          <p
            id={descriptionId}
            className="text-start text-sm text-gray-600 sm:text-base"
          >
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center" aria-hidden="true">
        <ChevronRight className="h-8 w-8 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 sm:h-12 sm:w-12 md:h-16 md:w-16" />
      </div>
    </Link>
  );
};

export default MenuOption;
