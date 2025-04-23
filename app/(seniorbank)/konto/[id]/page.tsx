import Heading from "@/ui/molecules/Heading";
import { prisma } from "@/lib/db";
import type { searchParams, tParams, TransactionDetails } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import { checkRegisteredUser } from "@/lib/auth";
import { TransactionList } from "./(components)/TransactionList";
import { SearchInput } from "./(components)/SearchInput";

export default async function AccountPage(props: {
  params: tParams;
  searchParams: searchParams;
}) {
  const { id } = await props.params;
  const { search } = await props.searchParams;
  const decodedId = decodeURIComponent(id);

  const user = await checkRegisteredUser();

  const account = await prisma.bankAccount.findUnique({
    where: {
      id: decodedId,
    },
  });

  if (!account) {
    notFound();
  }

  const transactions: TransactionDetails[] = await prisma.transaction.findMany({
    where: {
      OR: [
        {
          fromAccountId: decodedId,
        },
        {
          toAccountId: decodedId,
        },
      ],
    },
    include: {
      fromAccount: true,
      toAccount: true,
    },
  });

  // Filter transactions based on search query
  const filteredTransactions = search
    ? transactions.filter((transaction) => {
        const isIncoming = transaction.fromAccount.userId === user.id;
        const peerAccount = isIncoming
          ? transaction.toAccount
          : transaction.fromAccount;

        // Search in account name, category, or transaction ID
        return (
          peerAccount.name.toLowerCase().includes(search.toLowerCase()) ||
          (peerAccount.category &&
            peerAccount.category
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          transaction.id.toLowerCase().includes(search.toLowerCase())
        );
      })
    : transactions;

  return (
    <>
      <div className="max-w-fit">
        <Heading title={account.name} href="/konto">
          <p className="mr-2 mt-[-10px] text-end text-3xl text-seniorBankLightBlue">
            {decodedId}
          </p>
        </Heading>
      </div>

      <section className="my-16 flex flex-col items-center text-white">
        <h3 className="text-2xl font-bold">Saldo</h3>
        <h2 className="text-4xl font-bold md:text-6xl">
          {formatCurrency(account.balance, true)}
        </h2>
        <div className="mb-4 mt-16 w-full px-4">
          <SearchInput />
        </div>
        {filteredTransactions.length === 0 ? (
          <div>
            <p className="text-center text-2xl font-bold text-white">
              {search ? "Ingen transaksjoner funnet" : "Ingen transaksjoner"}
            </p>
          </div>
        ) : (
          <TransactionList transactions={filteredTransactions} user={user} />
        )}
      </section>
    </>
  );
}
