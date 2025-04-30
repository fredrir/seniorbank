"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  HomeIcon as House,
  Landmark,
  Wallet,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../molecules/LogoutButton";

const navLinks = [
  {
    title: "Hjem",
    icon: <House className="size-8" aria-hidden="true" />,
    path: "/",
    ariaLabel: "Gå til hjemmeside",
  },
  {
    title: "Konto",
    icon: <Landmark className="size-8" aria-hidden="true" />,
    path: "/konto",
    ariaLabel: "Gå til konto oversigt",
  },
  {
    title: "Overfør",
    icon: <ArrowLeftRight className="size-8" aria-hidden="true" />,
    path: "/overfor",
    ariaLabel: "Gå til overfør penge",
  },
  {
    title: "Betal",
    icon: <Wallet className="size-8" aria-hidden="true" />,
    path: "/betal",
    ariaLabel: "Gå til betal regninger",
  },
];

const NavBar = () => {
  const activePath = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);

  // Focus management
  useEffect(() => {
    if (activeTabRef.current) {
      // Only focus if the user is using keyboard navigation
      if (document.activeElement?.tagName === "BODY") {
        activeTabRef.current.focus();
      }
    }
  }, [activePath]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const navElements = navRef.current?.querySelectorAll('a[role="tab"]');
    if (!navElements) return;

    let newIndex = index;

    switch (e.key) {
      case "ArrowRight":
        newIndex = (index + 1) % navLinks.length;
        e.preventDefault();
        break;
      case "ArrowLeft":
        newIndex = (index - 1 + navLinks.length) % navLinks.length;
        e.preventDefault();
        break;
      case "Home":
        newIndex = 0;
        e.preventDefault();
        break;
      case "End":
        newIndex = navLinks.length - 1;
        e.preventDefault();
        break;
      default:
        return;
    }
    (navElements[newIndex] as HTMLElement).focus();
  };

  return (
    <div
      className="relative w-full bg-seniorbankBlue px-4 pb-8 pt-1"
      style={{ minHeight: "4rem" }}
    >
      <nav
        ref={navRef}
        className="flex w-full items-center justify-center"
        aria-label="Hovednavigation"
      >
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex flex-row items-center justify-center border-b-2 border-white"
        >
          {navLinks.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              ref={activePath === link.path ? activeTabRef : null}
              role="tab"
              aria-selected={activePath === link.path}
              aria-controls={`${link.title.toLowerCase()}-panel`}
              tabIndex={activePath === link.path ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={link.ariaLabel}
              className={`flex flex-row items-center justify-center rounded-t-2xl p-4 text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-seniorbankBlue ${
                activePath === link.path
                  ? "border-seniorBankLightBlue bg-seniorBankDarkBlue font-bold text-white"
                  : "text-white hover:bg-seniorBankLightBlue hover:text-seniorBankDarkBlue"
              }`}
            >
              <span className="flex flex-row items-center gap-2">
                {link.icon}
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
                  {link.title}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="absolute right-0 top-0 m-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default NavBar;
