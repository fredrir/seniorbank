import { listAllTransactions } from "@/actions/bankAccount";
import Heading from "../(components)/Heading";
import PaymentList from "../(components)/PaymentList";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";

export default async function PreviousApprovalsPage() {
  const transactionData = await listAllTransactions();

  return (
    <>
      <BackgroundGraphic variant="inverse-topwave" className="text-[#F8E9DD]" />
      <Heading title="Bekreft" href="/kontakt" className="pt-8" />

      <div className="mx-auto max-w-md">
        <PaymentList transactionData={transactionData} />
      </div>
    </>
  );
}
