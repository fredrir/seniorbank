import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import SessionWrapper from "./(components)/auth/SessionWrapper";
import AuthLayout from "./(components)/auth/AuthLayout";

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
          <AuthLayout>{children}</AuthLayout>
        </SessionWrapper>
      </body>
    </html>
  );
}
