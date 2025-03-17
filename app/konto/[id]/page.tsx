import TransactionItem from "@/components/account-overview/TransactionItem";
import HeaderText from "@/components/all/HeaderText";
import { Input } from "@/components/ui/input";
import { BankAccount, tParams, Transaction } from "@/lib/types";
import { Search } from "lucide-react";

const mockAccount: BankAccount = {
  accountNumber: "12345678901",
  balance: 18932.54,
  title: "Brukskonto",
  type: "savings",
};

const mockTransactions: Transaction[] = [
  {
    id: 1,
    amount: 826.87,
    date: "2021-10-01",
    to: "Rema 1000",
    from: "Navn Navnesen",
    description: "Dagligvare",
    accountNumber: "12345678901",
    type: "payment",
  },
  {
    id: 2,
    amount: 45.87,
    date: "2021-10-01",
    to: "SIT kantine",
    from: "Navn Navnesen",
    description: "Dagligvare",
    accountNumber: "12345678901",
    type: "payment",
  },
  {
    id: 3,
    amount: 1000,
    date: "2021-10-01",
    to: "Navn Navnesen",
    from: "Vipps",
    description: "Transaksjon",
    accountNumber: "12345678901",
    type: "deposit",
  },
  {
    id: 4,
    amount: 72.46,
    date: "2021-10-01",
    to: "Joker Stud.samf.",
    from: "Navn Navnesen",
    description: "Dagligvare",
    accountNumber: "12345678901",
    type: "payment",
  },
  {
    id: 5,
    amount: 599,
    date: "2021-10-01",
    to: "Klippers",
    from: "Navn Navnesen",
    description: "Kosmetikk",
    accountNumber: "12345678901",
    type: "payment",
  },
];

export default async function AccountPage(props: { params: tParams }) {
  const { id } = await props.params;
  const decodedId = decodeURIComponent(id);

  if (!id) {
    return <div>Not found</div>;
  }

  return (
    <>
      <section className="mb-16 md:mb-32">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width={100}
          height={100}
          className="absolute top-0 left-0 w-full h-[1200px] z-[-1] text-[#015aa4]"
        >
          <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
        </svg>
        {/* TODO: Change to actual account from prisma */}

        <div className="max-w-fit ">
          <HeaderText title="Brukskonto" href="/konto" />
          <p className="text-end text-seniorBankLightBlue text-3xl ">
            {decodedId}
          </p>
        </div>
      </section>
      <section className="flex flex-col mb-8 text-white items-center">
        <h3 className="text-2xl  font-bold mb-4">Saldo</h3>
        <h2 className="text-6xl font-bold">
          {mockAccount.balance.toLocaleString("no-NO", {
            style: "currency",
            currency: "NOK",
          })}
        </h2>
        <div className="px-4 mb-4 mt-16 w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
            <Input
              className="bg-[#4D8CBF] w-full border-none pl-10 text-white placeholder:text-white/70 rounded-full"
              placeholder="Søk"
            />
          </div>
        </div>
        <div className="flex flex-col w-full rounded-3xl">
          {mockTransactions.map((transaction, index) => (
            <div key={transaction.id}>
              <TransactionItem
                merchant={transaction.to}
                category={transaction.description}
                amount={transaction.amount}
                type={transaction.type}
                bgColor={
                  transaction.type === "deposit"
                    ? "bg-[#70c7aa]"
                    : "bg-[#b3cee4]"
                }
              />

              {index === 3 && (
                <div className="bg-[#b3cee4] border-b-2 border-[#4D8CBF] px-4 py-1 text-[#636363] text-sm flex justify-between">
                  <span>Onsdag</span>
                  <span>03 januar 2025</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
