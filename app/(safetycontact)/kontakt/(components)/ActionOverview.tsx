import React from "react";
import { ChevronRight, Clock10, MailIcon, Shield } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    name: "Tidligere godkjenninger",
    icon: Clock10,
    href: "/kontakt/tidligere-godkjenninger",
  },
  {
    name: "Sikkerhet og hjelp",
    icon: Shield,
    href: "/kontakt/kontakt",
  },
  {
    name: "Meldinger",
    icon: MailIcon,
    href: "/kontakt/meldinger",
  },
];

const ActionOverview = () => {
  return (
    <div className="flex flex-col gap-6">
      {actions.map((account) => (
        <Link
          href={account.href}
          key={account.href}
          className="group flex cursor-pointer flex-row items-center justify-between rounded-3xl bg-seniorbankWhite px-4 py-4 shadow-lg hover:opacity-80"
        >
          <div className="flex flex-row items-center gap-2">
            <div className="rounded-md">
              {React.createElement(account.icon)}
            </div>
            <h3 className="text-lg font-bold text-[#002776] md:text-xl">
              {account.name}
            </h3>
          </div>

          <div className="flex flex-row items-center gap-1">
            <ChevronRight className="size-12 text-seniorBankDarkBlue transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ActionOverview;
