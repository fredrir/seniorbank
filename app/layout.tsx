import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/auth/SessionWrapper";
import AuthLayout from "@/components/auth/AuthLayout";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import ContactFooter from "@/components/contact-page/ContactFooter";

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
        <ContactFooter />
      </body>
    </html>
  );
}
