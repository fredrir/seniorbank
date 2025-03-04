
"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  } from "@/components/ui/navigation-menu"
/* import { Link } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link"; */
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  title: String,
  icon: React.ReactNode;
  path: string;
}

const NavBar = ({title, icon, path}: Props) => {
  const pathname = usePathname();
  return (
    <div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild> 
                <Link
                href={path} className={`text-2xl flex flex-row items-center justify-center p-4 rounded-t-2xl transition-colors
                  ${
                    pathname === path
                      ? "bg-seniorBankDarkBlue text-white font-bold border-seniorBankLightBlue active:bg-seniorBankLightBlue active:text-seniorBankDarkBlue"
                      : "text-white hover:bg-seniorBankLightBlue hover:text-seniorBankDarkBlue active:bg-seniorBankDarkBlue active:text-white"
                  }`}
                >
                  <span className="flex flex-row items-center gap-2">{icon}{title}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="relative h-[2px] bg-seniorbankWhite"></div>
    </div>
  );
};

export default NavBar;