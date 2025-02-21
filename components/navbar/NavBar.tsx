import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Link } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  title: String,
  icon: React.ReactNode;
}

const NavBar = ({title, icon}: Props) => {
  return (
    <div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-2xl flex flex-row space-x-0 gap-2 text-white hover:bg-seniorBankLightBlue hover:text-seniorBankDarkBlue p-4 rounded-t-lg" asChild> 
                <a href="https://www.google.com/maps">{icon}{title} </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavBar;