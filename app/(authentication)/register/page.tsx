import { checkServerSession } from "@/lib/auth";
import RegisterAccountForm from "./(components)/RegisterAccountForm";

export default async function RegisterAccountPage() {
  const session = await checkServerSession();

  return <RegisterAccountForm session={session} />
}
