import { formatCurrency } from "@/lib/utils";
import { getSession } from "@/lib/auth";
import Heading from "../../(components)/Heading";
import { bankAccountService } from "@/model/core";
import { TransactionSearch } from "../../(components)/TransactionSearch";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";

export default async function ContactAccountPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const decodedId = decodeURIComponent(id);

  const { user } = await getSession();

  const account = await bankAccountService.getUserMainAccount(user.id);
  const { transactions, peerAccountDetails } =
    await bankAccountService.listTransactions(account.id, user.id);

  return (
    <>
      <BackgroundGraphic variant="top-halfcircle" className="text-[#F8E9DD]" />
      <div className="max-w-fit">
        <Heading title={account.name} href="/kontakt" />
        <p className="mr-2 mt-2 text-end text-base text-seniorbankBlue">
          {decodedId}
        </p>
      </div>

      <section className="my-16 flex flex-col items-center text-seniorBankDarkBlue">
        <h3 className="text-2xl font-bold">Saldo</h3>
        <h2 className="text-2xl font-bold md:text-4xl">
          {formatCurrency(account.balance, true)}
        </h2>

        <TransactionSearch
          transactions={transactions}
          peerAccountDetails={peerAccountDetails}
        />
      </section>
    </>
  );
}
