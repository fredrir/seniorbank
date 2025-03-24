import AccountCard from "@/components/account-overview/AccountCard";
import HeaderText from "@/components/all/HeaderText";
import SubHeaderText from "@/components/all/SubHeaderText";
import { BankAccountCard } from "@/components/homepage/BankAccountCard";
import { ShieldAlert } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/[auth]/[...nextauth]/authOptions";

export default async function AccountOverviewPage() {
  const session = await getServerSession(authOptions);

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
            bankAccount={session?.user.bankAccounts.find(
              (account) => account.main,
            )}
          />
        </div>
      </section>
      <section className="mb-8 mt-16 flex w-full flex-col">
        <div>
          <SubHeaderText title="Sparekonto" />

          <div className="rounded-[2.5rem] border-[0.4rem] border-seniorBankLightBlue">
            {session?.user.bankAccounts.map((account, index) => (
              <AccountCard
                account={account}
                key={index}
                index={index}
                length={session.user.bankAccounts.length}
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
