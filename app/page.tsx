import { BankAccountCard } from "@/components/homepage/BankAccountCard";
import MenuOption from "@/components/homepage/MenuOptions";
import { WarningSection } from "@/components/homepage/WarningSection";
import { BackgroundGraphic } from "@/components/ui/BackgroundGraphic";
import {
  ArrowBigDownDash,
  Banknote,
  HelpCircle,
  MailIcon,
  Settings,
  Wallet,
} from "lucide-react";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

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
    {
      title: "Spør om hjelp",
      description: "Kontakt vår kundehjelp eller Trygghetskontakten",
      icon: <HelpCircle className="size-16" />,
    },

    {
      title: "Innstillinger",
      description: "Endre på instillinger og infomasjon",
      icon: <Settings className="size-16" />,
    },
  ];

  return (
    <>
      <BackgroundGraphic variant="top-halfcircle" className="text-[#015aa4]" />
      <section className="h-[450px] overflow-hidden">
        <h1 className="text-7xl font-bold my-8 text-white">
          {session ? `Hei, ${session.user.name}` : "Hei, Navn Navnesen"}
        </h1>
        <p className="text-3xl text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod incididunt.
        </p>

        <div className="absolute top-[375px]">

        </div>
      </section>

      <section>
        <h2 className="text-5xl font-bold mb-8 text-seniorBankDarkBlue">
          Handlinger
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
          {menuOptions.map((option, index) => (
            <MenuOption
              title={option.title}
              description={option.description}
              icon={option.icon}
              key={index}
            />
          ))}
        </div>
      </section>

      <WarningSection />
    </>
  );
}
