import TransactionItem from "@/app/(user)/konto/(components)/TransactionItem";
import Heading from "@/components/molecules/Heading";
import { BackgroundGraphic } from "@/components/molecules/BackgroundGraphic";
import { Input } from "@/components/atoms/input";
import { prisma } from "@/lib/db";
import { tParams, TransactionDetails } from "@/lib/types";
import { capitalize, formatDateNumeric, formatCurrency, formatWeekday } from "@/lib/utils";
import { Search } from "lucide-react";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AccountPage(props: { params: tParams }) {
  const { id } = await props.params;
  const decodedId = decodeURIComponent(id);

  const user = await getCurrentUser();

  const account = await prisma.bankAccount.findUnique({
    where: {
      id: decodedId,
    }
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

  return (
    <>
      <section>
        <BackgroundGraphic
          variant="top-halfcircle"
          className="text-[#015aa4] h-[800px]"
        />
        <div className="max-w-fit">
          <Heading title={account.name} href="/konto" />

          <p className="text-end text-3xl text-seniorBankLightBlue mr-2 mt-[-10px]">
            {decodedId}
          </p>
        </div>
      </section>
      <section className="my-16 flex flex-col items-center text-white">
        <h3 className="text-2xl font-bold">Saldo</h3>
        <h2 className="text-4xl font-bold md:text-6xl">
          {formatCurrency(account.balance, true)}
        </h2>
        <div className="mb-4 mt-16 w-full px-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/70" />
            <Input
              className="w-full rounded-full border-none bg-[#4D8CBF] pl-10 text-white placeholder:text-white/70"
              placeholder="Søk"
            />
          </div>
        </div>
        {
          transactions.length === 0 && (
            <div>
              <p className="text-center text-2xl font-bold text-white">
                Ingen transaksjoner
              </p>
            </div>
          )
        }
        <div className="flex w-full flex-col rounded-3xl">
          {transactions.map((transaction, index, array) => (
            <div key={transaction.id}>
              {
                (index === 0 || (transaction.dueDate.getDate() !== array[index - 1].dueDate.getDate())) &&
                  <div className="flex justify-between border-b-2 border-[#4D8CBF] bg-[#b3cee4] px-4 py-1 text-sm text-[#636363]">
                    <span>{capitalize(formatWeekday(transaction.dueDate))}</span>
                    <span>
                      {formatDateNumeric(transaction.dueDate)}
                    </span>
                  </div>
              }
              <TransactionItem
                transaction={transaction}
                direction={transaction.fromAccount.userId === user.id ? "outgoing" : "incoming"}
                />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
