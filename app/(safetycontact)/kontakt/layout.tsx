import ContactFooter from "@/app/(safetycontact)/kontakt/(components)/ContactFooter";
import ContactNavbar from "@/app/(safetycontact)/kontakt/(components)/ContactNavbar";
import { getSession } from "@/lib/auth";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getSession();

  return (
    <>
      <ContactNavbar />

      <main className="mx-auto min-h-[80vh] max-w-4xl px-2 md:px-0">
        {children}{" "}
      </main>

      <ContactFooter />
    </>
  );
}
