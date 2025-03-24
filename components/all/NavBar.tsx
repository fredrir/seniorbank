"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, House, Landmark, Wallet } from "lucide-react";
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
    <div className="flex w-full justify-between items-center bg-seniorbankBlue px-4">
      <nav className="flex flex-row items-center justify-center flex-1">
        <span className="flex flex-row items-center justify-center border-b-2 border-white">
          {navLinks.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`flex flex-row items-center justify-center rounded-t-2xl p-4 text-2xl transition-colors ${
                pathname === link.path
                  ? "border-seniorBankLightBlue bg-seniorBankDarkBlue font-bold text-white active:bg-seniorBankLightBlue active:text-seniorBankDarkBlue"
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
      </nav>
      <button
        className="ml-8 flex gap-1 rounded-lg bg-[#D3D3EA] px-6 py-2 text-2xl font-bold text-[#002776] hover:opacity-80"
        onClick={handleLogout}
      >
        Logg ut
      </button>
    </div>
  );
};

export default NavBar;
