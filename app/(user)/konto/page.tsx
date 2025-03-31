import AccountCard from "@/app/(user)/konto/(components)/AccountCard";
import Heading from "@/components/molecules/Heading";
import SubHeading from "@/components/molecules/SubHeading";
import { ShieldAlert } from "lucide-react";
import { BackgroundGraphic } from "@/components/molecules/BackgroundGraphic";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AccountOverviewPage() {
  const user = await getCurrentUser();

  const accounts = await prisma.bankAccount.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <>
      <section className="h-[350px]">
        <BackgroundGraphic
          variant="top-halfcircle"
          className="text-[#015aa4] h-[400px]"
        />
        <Heading title="Kontooversikt" />
        <div className="flex flex-col items-center">
          <article className="flex flex-row items-center gap-2 text-lg text-white md:text-2xl">
            <ShieldAlert className="size-52" />
            Vær oppmerksom på uvanlige transaksjoner. Banken eller politiet vil
            aldri be deg om å overføre penger til en annen konto.
          </article>
        </div>
      </section>
      <section className="mb-8 flex w-full flex-col">
        <div>
          <SubHeading title="Bankkontoer" />

          <div className="rounded-[2.5rem] border-[0.4rem] border-seniorBankLightBlue">
            {accounts.map(account => (
              <AccountCard
                account={account}
                key={account.id}
              />
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
