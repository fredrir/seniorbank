"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navLinks = [
  {
    title: "Hjem",
    path: "/kontakt",
  },
  {
    title: "Bekreft",
    path: "/kontakt/bekreft",
  },
  {
    title: "Kontakt",
    path: "/kontakt/kontakt",
  },
];

const ContactNavbar = () => {
  const pathname = usePathname();

  const handleLogout = () =>
    signOut({
      callbackUrl: "/",
    });

  return (
    <div className="relative w-full bg-[#F8E9DD] px-4">
      <nav className="flex w-full items-center justify-center">
        <span className="flex flex-row items-center justify-center border-b-2 border-white">
          {navLinks.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`flex flex-row items-center justify-center rounded-t-2xl p-4 text-2xl transition-colors ${
                pathname === link.path
                  ? "border-seniorBankLightBlue bg-white text-seniorBankDarkBlue underline active:bg-seniorBankLightBlue active:text-seniorBankDarkBlue"
                  : "text-seniorBankDarkBlue hover:bg-seniorBankLightBlue hover:text-seniorBankDarkBlue active:bg-seniorBankDarkBlue active:text-seniorBankDarkBlue"
              }`}
            >
              <span className="flex flex-row items-center gap-2">
                {link.title}
              </span>
            </Link>
          ))}
        </span>
      </nav>
      <button
        className="absolute right-2 top-4 ml-8 rounded-lg text-2xl underline hover:opacity-80"
        onClick={handleLogout}
      >
        Logg ut
      </button>
    </div>
  );
};

export default ContactNavbar;
