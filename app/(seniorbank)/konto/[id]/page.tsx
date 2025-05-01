import { getSession } from "@/lib/auth";
import { bankAccountService } from "@/model/core";
import { formatCurrency } from "@/lib/utils";
import Heading from "@/ui/molecules/Heading";
import { notFound } from "next/navigation";
import { SearchInput } from "./(components)/SearchInput";
import { TransactionList } from "./(components)/TransactionList";

export default async function AccountPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search: string }>;
}) {
  const id = decodeURIComponent((await props.params).id);

  const { userId } = await getSession();

  const account = await bankAccountService.get(id, userId);
  if (account === null) {
    notFound();
  }

  const { transactions, peerAccountDetails } =
    await bankAccountService.listTransactions(id, userId);

  return (
    <>
      <div className="max-w-fit">
        <Heading title={account.name} href="/konto">
          <p className="mr-2 mt-[-10px] text-end text-3xl text-seniorBankLightBlue">
            {id}
          </p>
        </Heading>
      </div>

      <section className="my-16 flex min-h-[60vh] flex-col items-center text-white">
        <h3 className="text-2xl font-bold">Saldo</h3>
        <h2 className="text-4xl font-bold md:text-6xl">
          {formatCurrency(account.balance, true)}
        </h2>
        <div className="mb-4 mt-16 w-full px-4">
          <SearchInput />
        </div>
        <TransactionList
          transactions={transactions}
          peerAccountDetails={peerAccountDetails}
        />
      </section>
    </>
  );
}
