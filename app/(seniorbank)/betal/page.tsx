import { listAccounts, listApprovedPeers } from "@/actions/bankAccount";
import PaymentForm from "./(components)/PaymentView";

export default async function Payment() {
  const accounts = await listAccounts();
  const approvedPeers = await listApprovedPeers();

  return (
    <section className="mb-16 rounded-xl border-4 border-seniorBankLightPurple bg-seniorBankLightPurple p-12">
      <PaymentForm accounts={accounts} approvedPeers={approvedPeers} />
    </section>
  );
}
