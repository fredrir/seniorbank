import { getSession } from "@/lib/auth";
import SettingsWrapper from "./SettingsWrapper";

export default async function SettingsPage() {
  const session = await getSession();

  return <SettingsWrapper session={session} />;
}
