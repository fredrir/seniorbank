import HeaderText from "@/components/all/HeaderText";
import SubHeaderText from "@/components/all/SubHeaderText";
import { BankAccountCard } from "@/components/homepage/BankAccountCard";
import MenuOption from "@/components/homepage/MenuOptions";
import { WarningSection } from "@/components/homepage/WarningSection";
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
      href: "/account-overview",
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
      <section className="h-[450px]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width={100}
          height={100}
          className="absolute top-0 left-0 w-full h-[500px] z-[-1] text-[#015aa4]"
        >
          <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
        </svg>
        <HeaderText
          title={session ? `Hei, ${session.user.name}` : "Hei, Navn Navnesen"}
          className="my-8"
        />
        <p className="text-3xl text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod incididunt.
        </p>

        <div className="absolute top-[300px]">
          <BankAccountCard
            title="Brukskonto"
            accountNumber="1080 28 27364"
            balance={18932.54}
            href="/account-overview/1080%2028%2027364"
          />
        </div>
      </section>

      <section>
        <SubHeaderText title="Handlinger" />

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
          {menuOptions.map((option, index) => (
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

      <section className="absolute left-0 right-0">
        <WarningSection />
      </section>
    </>
  );
}
