import Heading from "@/ui/molecules/Heading";
import SubHeading from "@/ui/molecules/SubHeading";
import { ShieldAlert } from "lucide-react";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";
import React from "react";
import AccountCard from "./(components)/AccountCard";
import { getSession } from "@/lib/auth";
import { bankAccountService } from "@/model/core";

export default async function AccountOverviewPage() {
  const { user } = await getSession();

  const accounts = await bankAccountService.list(user.id);

  return (
    <>
      <section className="h-[350px]">
        <BackgroundGraphic
          variant="top-halfcircle"
          className="h-[400px] text-[#015aa4]"
        />
        <Heading title="Kontooversikt" />
        <div className="flex flex-row items-center gap-2 text-lg text-white md:text-2xl">
          <ShieldAlert className="size-52 h-[50%] text-white" />
          Vær oppmerksom på uvanlige transaksjoner. Banken eller politiet vil
          aldri be deg om å overføre penger til en annen konto.
        </div>
      </section>
      <section className="mb-8 flex w-full flex-col">
        <div>
          <SubHeading title="Bankkontoer" />

          <div className="rounded-[2.5rem] border-[0.4rem] border-seniorBankLightBlue">
            {accounts.map((account) => (
              <AccountCard account={account} key={account.id} />
            ))}
          </div>
        </div>
      </section>
      <section className="my-16 md:my-32">
        <SubHeading title="Fond" />
      </section>
    </>
  );
}
