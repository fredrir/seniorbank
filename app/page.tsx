import MenuOptions from "@/components/homepage/MenuOptions";
import { ArrowBigDownDash, ArrowLeftRight, Banknote, BanknoteIcon, HomeIcon, House, Landmark, MailIcon, Wallet } from "lucide-react";
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
import NavBar from "@/components/navbar/NavBar";


export default function Home() {
  const menuOptions = [
    {
      title: "Konto oversikt",
      description: "Se oversikt over dine kontoer",
      icon: <Banknote className="size-16" />,
    },
    {
      title: "Betaling",
      description: "Betale fakturaer og opprett AvtaleGiro",
      icon: <Wallet className="size-16" />,
    },
    {
      title: "Overfør",
      description: "Overfør penger mellom egne kontoer",
      icon: <ArrowBigDownDash className="size-16" />,
    },
    {
      title: "Meldinger",
      description: "Les meldinger og varslinger fra banken",
      icon: <MailIcon className="size-16" />,
    },
  ];

  const navBar = [
    {
      title: "Hjem",
      icon: <House className="size-8"/>,
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
    }

    
  ]

  return (
    <section /* className="mx-auto container" */>
      <div className="bg-seniorbankBlue flex flex-row items-center justify-center p-5">
        {navBar.map((option, index) => (
          <NavBar
            title={option.title}
            icon={option.icon}
            path={option.path}
            key={index}
          />
        ))
        }
      </div>
      <div className="mx-auto container ">
        <h1 className="text-5xl font-bold mt-16 mb-8 text-seniorBankDarkBlue">
          Handlinger
        </h1>

        <div className="flex flex-col items-center gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl w-full gap-8">
            {menuOptions.map((option, index) => (
              <MenuOptions
                title={option.title}
                description={option.description}
                icon={option.icon}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
}
