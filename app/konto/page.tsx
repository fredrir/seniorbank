import AccountCard from "@/components/account-overview/AccountCard";
import HeaderText from "@/components/all/HeaderText";
import SubHeaderText from "@/components/all/SubHeaderText";
import { BankAccountCard } from "@/components/homepage/BankAccountCard";
import { BackgroundGraphic } from "@/components/ui/BackgroundGraphic";
import { BankAccount } from "@/lib/types";
import { ShieldAlert } from "lucide-react";

//TODO mock data

const savingAccounts: BankAccount[] = [
  {
    title: "Sparekonto",
    accountNumber: "1080 28 27364",
    balance: 830726,
    type: "savings",
  },
  {
    title: "Barnebarn",
    accountNumber: "1080 28 27364",
    balance: 34835,
    type: "savings",
  },
  {
    title: "Russetid",
    accountNumber: "1080 28 27364",
    balance: 10835,
    type: "savings",
  },
];

const loanAccounts: BankAccount[] = [
  {
    title: "Boliglån",
    accountNumber: "1080 28 27364",
    balance: 830726,
    type: "loan",
  },
  {
    title: "Studielån",
    accountNumber: "1080 28 27364",
    balance: 10835,
    type: "loan",
  },
];

export default function AccountOverviewPage() {
  return (
    <>
      <section>
        <BackgroundGraphic
          variant="inverse-topwave"
          className="text-[#015aa4]"
        />
        <HeaderText title="Kontooversikt" className="mt-8" />
        <div className="flex flex-col items-center">
          <article className="flex flex-row items-center gap-2 text-lg text-white md:text-2xl">
            <ShieldAlert className="size-52" />
            Vær oppmerksom på uvanlige transaksjoner. Banken eller politiet vil
            aldri be deg om å overføre penger til en annen konto.
          </article>

          <BankAccountCard
            title="Brukskonto"
            accountNumber="1080 28 27364"
            balance={18932.54}
            href="/konto/1080-28-27364"
          />
        </div>
      </section>
      <section className="mb-8 mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <SubHeaderText title="Sparekonto" />

          <div className="rounded-[2.5rem] border-[0.4rem] border-seniorBankLightBlue">
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
          <div className="rounded-[2.5rem] border-[0.4rem] border-seniorBankLightBlue">
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
