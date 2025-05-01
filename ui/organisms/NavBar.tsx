"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/ui/molecules/LogoutButton";
import NavbarLink from "@/ui/molecules/NavbarLink";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const navbarVariants = cva("relative w-full px-4", {
  variants: {
    variant: {
      contact: "bg-[#F8E9DD]",
      seniorbank: "bg-seniorbankBlue pt-1 pb-8 text-white",
    },
  },
});

interface NavbarProps extends VariantProps<typeof navbarVariants> {
  links: { title: string; path: string; icon?: React.ReactNode }[];
}

const Navbar = ({ links, ...props }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <div className={navbarVariants(props)}>
      <nav className="flex w-full items-center justify-center">
        <span
          className={cn("flex flex-row items-center justify-center", {
            "border-b-2 border-white": props.variant === "seniorbank",
          })}
        >
          {links.map(({ path, icon, title }) => (
            <NavbarLink
              active={pathname === path}
              key={path}
              icon={icon}
              path={path}
              title={title}
            />
          ))}
        </span>
      </nav>
      <div className="absolute bottom-0 right-0 top-0 my-auto mr-4 flex items-center">
        <LogoutButton variant={props.variant} />
      </div>

      <div className="absolute left-0 top-0 m-4">
        {props.variant === "contact" && <Link href="/">Gå til seniorbank</Link>}
        {props.variant === "seniorbank" && (
          <Link href="/kontakt">Gå til kontaktside</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
