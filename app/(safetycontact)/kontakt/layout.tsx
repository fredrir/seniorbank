import ContactFooter from "@/app/(safetycontact)/kontakt/(components)/ContactFooter";
import ContactNavbar from "@/app/(safetycontact)/kontakt/(components)/ContactNavbar";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";
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
      <BackgroundGraphic variant="mid-wave" className="text-[#F8E9DD]" />
      <div className="mx-auto max-w-4xl px-2 md:px-0">{children} </div>
      <ContactFooter />
    </>
  );
}
