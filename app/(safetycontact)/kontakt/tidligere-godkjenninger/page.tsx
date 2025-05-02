import { listAllTransactions } from "@/actions/bankAccount";
import Heading from "../(components)/Heading";
import PaymentList from "../(components)/PaymentList";

export default async function PreviousApprovalsPage() {
  const transactionData = await listAllTransactions();

  return (
    <main>
      <Heading title="Bekreft" href="/kontakt" className="pt-8" />

      <div className="mx-auto max-w-md">
        <PaymentList transactionData={transactionData} />
      </div>
    </main>
  );
}
