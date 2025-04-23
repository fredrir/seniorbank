import NavBar from "@/ui/organisms/NavBar";
import { checkRegisteredUser } from "@/lib/auth";
import Footer from "@/ui/organisms/Footer";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkRegisteredUser();

  return (
    <>
      <NavBar />

      <main className="mx-auto max-w-4xl px-2 md:px-0">{children} </main>

      <Footer />
    </>
  );
}
