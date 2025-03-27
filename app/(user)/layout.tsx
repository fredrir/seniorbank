import type { Metadata } from "next";
import NavBar from "@/components/all/NavBar";

export const metadata: Metadata = {
  title: "Seniorbank",
  description: "Bank for eldre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-4xl px-2 md:px-0">{children} </div>
    </>
  );
}
