"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  House,
  Landmark,
  LogOutIcon,
  Wallet,
} from "lucide-react";
import { signOut } from "next-auth/react";

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
    path: "/betal",
  },
];

const NavBar = () => {
  const pathname = usePathname();

  const handleLogout = () =>
    signOut({
      callbackUrl: "/",
    });

  return (
    <nav className="bg-seniorbankBlue pb-4  flex flex-row items-center justify-between ">
      <div />
      <span className="flex flex-row items-center justify-center border-b-2 px-4 border-white">
        {navLinks.map((link, index) => (
          <Link
            href={link.path}
            key={index}
            className={`text-2xl flex flex-row items-center justify-center p-4 rounded-t-2xl transition-colors
                  ${
                    pathname === link.path
                      ? "bg-seniorBankDarkBlue text-white font-bold border-seniorBankLightBlue active:bg-seniorBankLightBlue active:text-seniorBankDarkBlue"
                      : "text-white hover:bg-seniorBankLightBlue hover:text-seniorBankDarkBlue active:bg-seniorBankDarkBlue active:text-white"
                  }`}
          >
            <span className="flex flex-row items-center gap-2">
              {link.icon}
              {link.title}
            </span>
          </Link>
        ))}
      </span>

      <button
        className="py-2 px-4 bg-[#D3D3EA] flex gap-1 hover:opacity-80 text-[#002776] rounded-lg text-2xl font-bold ml-4"
        onClick={handleLogout}
      >
        <LogOutIcon className="size-8" />
        Logg ut
      </button>
    </nav>
  );
};

export default NavBar;
