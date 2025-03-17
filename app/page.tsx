import HeaderText from "@/components/all/HeaderText";
import SubHeaderText from "@/components/all/SubHeaderText";
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
      href: "/konto",
      availableFor: ["EASY", "MEDIUM", "HARD"],
    },
    {
      title: "Betaling",
      description: "Betale fakturaer og opprett AvtaleGiro",
      icon: <Wallet className="size-16" />,
      availableFor: ["MEDIUM", "HARD"],
    },
    {
      title: "Overfør",
      description: "Overfør penger mellom egne kontoer",
      icon: <ArrowBigDownDash className="size-16" />,
      availableFor: ["EASY", "MEDIUM", "HARD"],
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
    },

    {
      title: "Innstillinger",
      description: "Endre på instillinger og infomasjon",
      icon: <Settings className="size-16" />,
      availableFor: ["HARD"],
    },
  ];


  //TODO  get user difficulty
  const difficulty = "HARD";

  const filteredMenuOptions = menuOptions.filter((option) =>
    option.availableFor.includes(difficulty)
  );

  return (
    <>
      <BackgroundGraphic variant="top-halfcircle" className="text-[#015aa4]" />
      <section className="h-[450px] overflow-hidden">
        <HeaderText
          title={session ? `Hei, ${session.user.name}` : "Hei, Navn Navnesen"}
          className="my-8"
        />
        <p className="text-3xl text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod incididunt.
        </p>
    

        <div className="absolute top-[375px]">
          <BankAccountCard
            title="Brukskonto"
            accountNumber="1080 28 27364"
            balance={18932.54}
            href="/konto/1080-28-27364"
          />
        </div>
      </section>

      <section>
        <SubHeaderText title="Handlinger" />



        <div className={`grid w-full grid-cols-1 gap-8 ${difficulty === "EASY" ? "" : "md:grid-cols-2"}`}>
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

      <WarningSection />
    </>
  );
}
