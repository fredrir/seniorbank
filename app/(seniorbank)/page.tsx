import Heading from "@/ui/molecules/Heading";
import SubHeading from "@/ui/molecules/SubHeading";
import { BankAccountCard } from "@/app/(seniorbank)/(components)/BankAccountCard";
import MenuOption from "@/app/(seniorbank)/(components)/MenuOptions";
import { WarningSection } from "@/app/(seniorbank)/(components)/WarningSection";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";
import {
  ArrowBigDownDash,
  Banknote,
  HelpCircle,
  MailIcon,
  Settings,
  Wallet,
} from "lucide-react";
import HiddenMenuOptions from "@/app/(seniorbank)/(components)/HiddenMenuOptions";
import { getSession } from "@/lib/auth";
import { bankAccountService } from "@/model/core";

export default async function Home() {
  const { user } = await getSession();

  const mainBankAccount = await bankAccountService.getUserMainAccount(user.id);

  const menuOptions = [
    {
      title: "Kontoer",
      description: "Se oversikt over dine kontoer",
      icon: <Banknote className="size-16" />,
      href: "/konto",
      availableFor: ["EASY", "MEDIUM", "HARD"],
    },
    {
      title: "Betaling",
      description: "Betale fakturaer og opprett AvtaleGiro",
      icon: <Wallet className="size-16" />,
      availableFor: ["MEDIUM", "HARD"],
      href: "/betal",
    },
    {
      title: "Overfør",
      description: "Overfør penger mellom egne kontoer",
      icon: <ArrowBigDownDash className="size-16" />,
      availableFor: ["EASY", "MEDIUM", "HARD"],
      href: "/overfor",
    },
    {
      title: "Meldinger",
      description: "Les meldinger og varslinger fra banken",
      icon: <MailIcon className="size-16" />,
      availableFor: ["HARD"],
    },
    {
      title: "Spør om hjelp",
      description: "Kontakt vår kundehjelp eller Trygghetskontakten",
      icon: <HelpCircle className="size-16" />,
      availableFor: ["EASY", "MEDIUM", "HARD"],
      href: "/kontaktside",
    },

    {
      title: "Innstillinger",
      description: "Endre på instillinger og infomasjon",
      icon: <Settings className="size-16" />,
      availableFor: ["HARD"],
      href: "/innstillinger",
    },
  ];

  const filteredMenuOptions = menuOptions.filter((option) =>
    option.availableFor.includes(user.difficulty),
  );

  const hiddenMenuOptions = menuOptions.filter(
    (option) => !option.availableFor.includes(user.difficulty),
  );

  return (
    <>
      <BackgroundGraphic variant="top-halfcircle" className="text-[#015aa4]" />
      <section className="h-[450px] overflow-hidden">
        <Heading
          title={user ? `Hei, ${user.name}` : "Hei, Navn Navnesen"}
          className="mb-8"
        />
        <p className="text-3xl text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod incididunt.
        </p>

        {mainBankAccount !== null && (
          <div className="absolute top-[375px]">
            <BankAccountCard bankAccount={mainBankAccount} />
          </div>
        )}
      </section>

      <section>
        <SubHeading title="Handlinger" />

        <div
          className={`grid w-full grid-cols-1 gap-8 ${user.difficulty === "EASY" ? "" : "md:grid-cols-2"}`}
        >
          {filteredMenuOptions.map((option, index) => (
            <MenuOption
              title={option.title}
              description={option.description}
              icon={option.icon}
              href={option.href}
              key={index}
            />
          ))}
        </div>
      </section>

      {user.difficulty !== "HARD" && (
        <HiddenMenuOptions hiddenMenuOptions={hiddenMenuOptions} />
      )}
      <WarningSection />
    </>
  );
}
