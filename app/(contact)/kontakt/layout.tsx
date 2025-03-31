import ContactFooter from "@/app/(contact)/kontakt/(components)/ContactFooter";
import ContactNavbar from "@/app/(contact)/kontakt/(components)/ContactNavbar";
import { BackgroundGraphic } from "@/components/molecules/BackgroundGraphic";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ContactNavbar />
      <BackgroundGraphic variant="mid-wave" className="text-[#F8E9DD]" />
      <div className="mx-auto max-w-4xl px-2 md:px-0">{children} </div>
      <ContactFooter />
    </>
  );
}
