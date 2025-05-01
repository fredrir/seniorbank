import Footer from "@/ui/organisms/Footer";
import SeniorbankNavbar from "./(components)/SeniorbankNavbar";
import { getSession } from "@/lib/auth";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getSession();

  return (
    <>
      <SeniorbankNavbar />

      <main className="mx-auto max-w-4xl px-2 md:px-0">{children} </main>

      <Footer />
    </>
  );
}
