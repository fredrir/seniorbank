import Heading from "@/ui/molecules/Heading";
import SubHeading from "@/ui/molecules/SubHeading";
import { ShieldAlert } from "lucide-react";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";
import { checkRegisteredUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AccountCard from "./(components)/AccountCard";

export default async function AccountOverviewPage() {
  const user = await checkRegisteredUser();

  const accounts = await prisma.bankAccount.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <main>
      <section className="h-[350px]" aria-labelledby="page-heading">
        <BackgroundGraphic
          variant="top-halfcircle"
          className="h-[400px] text-[#015aa4]"
          aria-hidden="true"
        />
        <Heading title="Kontooversikt" id="page-heading" />
        <div
          className="flex flex-row items-center gap-2 text-lg text-white md:text-2xl"
          role="alert"
        >
          <ShieldAlert
            className="h-6 w-auto text-white md:h-8"
            aria-hidden="true"
          />
          <span>
            Vær oppmerksom på uvanlige transaksjoner. Banken eller politiet vil
            aldri be deg om å overføre penger til en annen konto.
          </span>
        </div>
      </section>

      <section
        className="mb-8 flex w-full flex-col"
        aria-labelledby="accounts-heading"
      >
        <div>
          <SubHeading title="Bankkontoer" id="accounts-heading" />

          <div
            className="rounded-[2.5rem] border-[0.4rem] border-seniorBankLightBlue"
            role="region"
            aria-label="Liste over bankkontoer"
          >
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <AccountCard account={account} key={account.id} />
              ))
            ) : (
              <p className="p-6 text-center">Ingen bankkontoer funnet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="my-16 md:my-32" aria-labelledby="funds-heading">
        <SubHeading title="Fond" id="funds-heading" />
      </section>
    </main>
  );
}
