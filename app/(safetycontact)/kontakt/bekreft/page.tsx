import Heading from "../(components)/Heading";
import { listHeldTransactions } from "@/actions/bankAccount";
import ApprovalList from "./(components)/ApprovalList";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";

export default async function ContactPersonConfirmationPage() {
  const heldTransactionData = await listHeldTransactions();

  return (
    <>
      <BackgroundGraphic variant="inverse-topwave" className="text-[#F8E9DD]" />
      <Heading title="Bekreft" href="/kontakt" className="pt-8" />

      <ApprovalList initialData={heldTransactionData} />
    </>
  );
}
