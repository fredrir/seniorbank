import { TransferPage } from "./(components)/TransferPage";
import { listAccounts } from "@/actions/bankAccount";

export default async function OverforPage() {
  const accounts = await listAccounts();

  return <TransferPage accounts={accounts} />;
}
