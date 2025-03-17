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
          className="absolute left-0 top-0 z-[-1] h-[1200px] w-full text-[#015aa4]"
        >
          <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
        </svg>
        {/* TODO: Change to actual account from prisma */}

        <div className="max-w-fit">
          <HeaderText title="Brukskonto" href="/konto" />
          <p className="text-end text-3xl text-seniorBankLightBlue">
            {decodedId}
          </p>
        </div>
      </section>
      <section className="mb-8 flex flex-col items-center text-white">
        <h3 className="mb-4 text-2xl font-bold">Saldo</h3>
        <h2 className="text-6xl font-bold">
          {mockAccount.balance.toLocaleString("no-NO", {
            style: "currency",
            currency: "NOK",
          })}
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
        <div className="flex w-full flex-col rounded-3xl">
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
                <div className="flex justify-between border-b-2 border-[#4D8CBF] bg-[#b3cee4] px-4 py-1 text-sm text-[#636363]">
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
