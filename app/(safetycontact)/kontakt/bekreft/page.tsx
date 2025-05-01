import Heading from "../(components)/Heading";
import { listHeldTransactions } from "@/actions/bankAccount";
import ApprovalList from "./(components)/ApprovalList";

export default async function ContactPersonConfirmationPage() {
  const heldTransactionData = await listHeldTransactions();

  return (
    <>
      <Heading title="Bekreft" href="/kontakt" className="pt-8" />

      <ApprovalList initialData={heldTransactionData} />
    </>
  );
}
