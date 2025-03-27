import type { Metadata } from "next";
import "../globals.css";
import SessionWrapper from "@/components/auth/SessionWrapper";
import AuthLayout from "@/components/auth/AuthLayout";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
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
    <html lang="en">
      <body className={cn("bg-seniorbankWhite text-primary antialiased")}>
        <Toaster />
        <SessionWrapper>
          <AuthLayout>
            <NavBar />
            <div className="mx-auto max-w-4xl px-2 md:px-0">{children} </div>
          </AuthLayout>
        </SessionWrapper>
      </body>
    </html>
  );
}
