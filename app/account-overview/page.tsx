import AccountCard from "@/components/account-overview/AccountCard";
import HeaderText from "@/components/all/HeaderText";
import SubHeaderText from "@/components/all/SubHeaderText";
import { BankAccountCard } from "@/components/homepage/BankAccountCard";
import { BankAccount } from "@/lib/types";
import { ShieldAlert } from "lucide-react";

//TODO mock data

const savingAccounts: BankAccount[] = [
  {
    title: "Sparekonto",
    accountNumber: "1080 28 27364",
    balance: 18932.54,
    type: "savings",
  },
  {
    title: "Barnebarn",
    accountNumber: "1080 28 27364",
    balance: 18932.54,
    type: "savings",
  },
  {
    title: "Russetid",
    accountNumber: "1080 28 27364",
    balance: 18932.54,
    type: "savings",
  },
];

const loanAccounts: BankAccount[] = [
  {
    title: "Boliglån",
    accountNumber: "1080 28 27364",
    balance: 18932.54,
    type: "loan",
  },
  {
    title: "Studielån",
    accountNumber: "1080 28 27364",
    balance: 18932.54,
    type: "loan",
  },
];

export default function AccountOverviewPage() {
  return (
    <>
      <section className="h-[450px] ">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width={100}
          height={100}
          className="absolute top-0 left-0 w-full h-[500px] z-[-1] text-[#015aa4]"
        >
          <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
        </svg>
        <HeaderText title="Kontooversikt" className="" />
        <div className="flex flex-col items-center ">
          <article className="text-3xl text-white flex flex-row gap-2 items-center">
            <ShieldAlert className="size-64" />
            Vær oppmerksom på uvanlige transaksjoner. Banken eller politiet vil
            aldri be deg om å overføre penger til en annen konto.
          </article>

          <BankAccountCard
            title="Brukskonto"
            accountNumber="1080 28 27364"
            balance={18932.54}
            href="/account-overview/1080-28-27364"
          />
        </div>
      </section>
      <section className="mb-8 mt-16 grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-16">
        <div>
          <SubHeaderText title="Sparekonto" />

          <div className="border-[0.4rem] border-seniorBankLightBlue rounded-[2.5rem]">
            {savingAccounts.map((account, index) => (
              <AccountCard
                account={account}
                key={index}
                index={index}
                length={savingAccounts.length}
              />
            ))}
          </div>
        </div>

        <div>
          <SubHeaderText title="Lån" />
          <div className="border-[0.4rem] border-seniorBankLightBlue rounded-[2.5rem]">
            {loanAccounts.map((account, index) => (
              <AccountCard
                account={account}
                key={index}
                index={index}
                length={loanAccounts.length}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="my-16 md:my-32">
        <SubHeaderText title="Fond" />
      </section>
    </>
  );
}
