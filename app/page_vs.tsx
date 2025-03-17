import { BankAccountCard } from "@/components/homepage_vs/BankAccountCard";
import MenuOption from "@/components/homepage_vs/MenuOptions";
import { WarningSection } from "@/components/homepage_vs/WarningSection";
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
        title: "Spør om hjelp",
        description: "Kontakt vår kundehjelp eller Trygghetskontakten",
        icon: <HelpCircle className="size-16" />,
      }, 
    ]


    const menuOptions2 = [
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
        <h1 className="text-7xl font-bold my-8 text-white">
          {session ? `Hei, ${session.user.name}` : "Hei, Navn Navnesen"}
        </h1>
        <p className="text-3xl text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod incididunt.
        </p>

        <div className="absolute top-[300px]">
          <BankAccountCard
            title="Brukskonto"
            accountNumber="1080 28 27364"
            balance={18932.54}
            href="/accounts/x"
          />
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

      <section className="absolute left-0 right-0">
        <WarningSection />
      </section>
    </>
  );
}
