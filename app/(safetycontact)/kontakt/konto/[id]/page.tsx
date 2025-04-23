import { Input } from "@/ui/atoms/Input";
import { tParams, TransactionDetails } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Search } from "lucide-react";
import { checkRegisteredUser } from "@/lib/auth";
import { TransactionList } from "@/app/(seniorbank)/konto/[id]/(components)/TransactionList";
import Heading from "../../(components)/Heading";

export default async function ContactAccountPage(props: { params: tParams }) {
  const { id } = await props.params;
  const decodedId = decodeURIComponent(id);

  const user = await checkRegisteredUser();

  // TODO mock

  const account = {
    id: "1234 5678901",
    name: "Brukskonto",
    balance: 1000,
  };

  const transactions: TransactionDetails[] = [
    {
      id: "1",
      amount: 100,
      fromAccount: {
        id: "1",
        name: "Testkonto",
        userId: user.id,
        category: "Test",
        balance: 1000,
        main: true,
        countryCode: "NO",
      },
      toAccount: {
        id: "2",
        name: "Testkonto 2",
        userId: user.id,
        category: "Test",
        balance: 500,
        main: false,
        countryCode: "NO",
      },
      dueDate: new Date("2025-04-20"),
      createdAt: new Date("2025-04-18"),
    },
    {
      id: "2",
      amount: 1000,
      fromAccount: {
        id: "1",
        name: `${user.name} sin konto`,
        userId: user.id,
        category: "Test",
        balance: 1000,
        main: true,
        countryCode: "NO",
      },
      toAccount: {
        id: "3",
        name: "Testkonto 3",
        userId: "1234",
        category: "Test",
        balance: 300,
        main: false,
        countryCode: "NO",
      },
      dueDate: new Date("2025-04-15"),
      createdAt: new Date("2025-04-14"),
    },
    {
      id: "3",
      amount: 5000,
      fromAccount: {
        id: "4",
        name: "Arbeidsgiver AS",
        userId: "employer-01",
        category: "Salary",
        balance: 20000,
        main: false,
        countryCode: "NO",
      },
      toAccount: {
        id: "1",
        name: "Testkonto",
        userId: user.id,
        category: "Income",
        balance: 6000,
        main: true,
        countryCode: "NO",
      },
      dueDate: new Date("2025-04-01"),
      createdAt: new Date("2025-04-01"),
    },
    {
      id: "4",
      amount: 50,
      fromAccount: {
        id: "1",
        name: "Testkonto",
        userId: user.id,
        category: "Checking",
        balance: 6000,
        main: true,
        countryCode: "NO",
      },
      toAccount: {
        id: "5",
        name: "Kaffebaren",
        userId: "merchant-07",
        category: "Food & Drink",
        balance: 1500,
        main: false,
        countryCode: "NO",
      },
      dueDate: new Date("2025-04-21"),
      createdAt: new Date("2025-04-21"),
    },
    {
      id: "5",
      amount: 200,
      fromAccount: {
        id: "1",
        name: "Testkonto",
        userId: user.id,
        category: "Checking",
        balance: 5950,
        main: true,
        countryCode: "NO",
      },
      toAccount: {
        id: "6",
        name: "Venn 3",
        userId: "friend-99",
        category: "Personal",
        balance: 800,
        main: false,
        countryCode: "SE",
      },
      dueDate: new Date("2025-04-19"),
      createdAt: new Date("2025-04-19"),
    },
  ];

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
          <TransactionList transactions={transactions} user={user} />
        )}
      </section>
    </>
  );
}
