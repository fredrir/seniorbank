import { getServerSession } from "@/lib/auth";
import SettingsWrapper from "./SettingsWrapper";

export default async function SettingsPage() {
  const session = await getServerSession();

  return <SettingsWrapper session={session} />;
}
