import { getUnregisteredSession } from "@/lib/auth";
import RegisterAccountForm from "./(components)/RegisterAccountForm";

export default async function RegisterAccountPage() {
  const session = await getUnregisteredSession();

  return <RegisterAccountForm session={session} />;
}
