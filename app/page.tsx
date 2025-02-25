import MenuOptions from "@/components/homepage/MenuOptions";
import { ArrowBigDownDash, Banknote, HelpCircle, MailIcon, Settings, Wallet } from "lucide-react";

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
    <section className="mx-auto container">
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
    </section>
  );
}
