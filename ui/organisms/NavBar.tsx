"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftRight, House, Landmark, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../molecules/LogoutButton";

const navLinks = [
  {
    title: "Hjem",
    icon: <House className="size-8" />,
    path: "/",
  },
  {
    title: "Konto",
    icon: <Landmark className="size-8" />,
    path: "/konto",
  },
  {
    title: "Overfør",
    icon: <ArrowLeftRight className="size-8" />,
    path: "/overfor",
  },
  {
    title: "Betal",
    icon: <Wallet className="size-8" />,
    path: "/payment",
  },
];

const NavBar = () => {
  const activePath = usePathname();

  return (
    <div className="relative w-full bg-seniorbankBlue px-4 pb-8 pt-1">
      <nav className="flex w-full items-center justify-center">
        <span className="flex flex-row items-center justify-center border-b-2 border-white">
          {navLinks.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`flex flex-row items-center justify-center rounded-t-2xl p-4 text-2xl transition-colors ${
                activePath === link.path
                  ? "border-seniorBankLightBlue bg-seniorBankDarkBlue font-bold text-white"
                  : "text-white hover:bg-seniorBankLightBlue hover:text-seniorBankDarkBlue"
              }`}
            >
              <span className="flex flex-row items-center gap-2">
                {link.icon}
                {link.title}
              </span>
            </Link>
          ))}
        </span>
      </nav>

      <div className="absolute right-0 top-0 m-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default NavBar;
