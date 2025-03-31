import ContactNavbar from "@/components/contact-page/ContactNavbar";
import { BackgroundGraphic } from "@/components/ui/BackgroundGraphic";

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
    </>
  );
}
