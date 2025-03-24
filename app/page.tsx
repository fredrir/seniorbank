import HeaderText from "@/components/all/HeaderText";
import SubHeaderText from "@/components/all/SubHeaderText";
import { BankAccountCard } from "@/components/homepage/BankAccountCard";
import MenuOption from "@/components/homepage/MenuOptions";
import { WarningSection } from "@/components/homepage/WarningSection";
import { BackgroundGraphic } from "@/components/ui/BackgroundGraphic";
import {
  ArrowBigDownDash,
  Banknote,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  MailIcon,
  Settings,
  Wallet
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/[auth]/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

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
  const difficulty = "MEDIUM";

  const filteredMenuOptions = menuOptions.filter((option) =>
    option.availableFor.includes(difficulty)
  );


  const hiddenMenuOptions = menuOptions.filter((option) => 
    !option.availableFor.includes(difficulty)
  );

  //const [showHidden, setShowHidden] = useState(false); 


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
            bankAccount={session?.user.bankAccounts.find(
              (account) => account.main,
            )}
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


      <div>
      <button className="">
        {hiddenMenuOptions.length > 0 && (
          <details>
           <summary className="text-seniorBankDarkBlue font-bold text-4xl py-20 flex items-center gap-2">
           Flere handlinger
           <ChevronDown className="size-16" />
            </summary> 



            <div className="mt-2 flex flex-col gap-8">
            {hiddenMenuOptions.map((option, index) => (
              <a
                key={`hidden-${index}`}
                href={option.href}
                className="flex items-center gap-8 p-6 rounded-2xl py-4 shadow hover:border-blue-500 border-4 border-seniorBankLightBlue"
              >
                {option.icon}
                <div className="flex flex-col gap-4 items-start">
                  <h1 className="font-bold text-2xl">{option.title}</h1>
                  <p className="text-gray-600 ">{option.description}</p>
                </div>

                <div className="flex flex-col justify-center">
                <ChevronRight className="size-16 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
              </a>
            ))}
          </div>
          </details>
        )}
      </button>
    </div>


      <WarningSection />
    </>
  );
}
