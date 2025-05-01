import { Input } from "@/ui/atoms/Input";
import { formatCurrency } from "@/lib/utils";
import { Search } from "lucide-react";
import { getSession } from "@/lib/auth";
import { TransactionList } from "@/app/(seniorbank)/konto/[id]/(components)/TransactionList";
import Heading from "../../(components)/Heading";
import { bankAccountService } from "@/model/core";

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
        <div className="mb-4 mt-16 w-full px-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-700" />
            <Input
              className="w-full rounded-full border-none bg-gray-200 pl-10 text-gray-700 placeholder:text-gray-700"
              placeholder="Søk etter betalinger..."
            />
          </div>
        </div>
        {transactions.length === 0 ? (
          <div>
            <p className="text-center text-2xl font-bold text-white">
              Ingen transaksjoner
            </p>
          </div>
        ) : (
          <TransactionList
            transactions={transactions}
            peerAccountDetails={peerAccountDetails}
          />
        )}
      </section>
    </>
  );
}
