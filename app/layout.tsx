import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/auth/SessionWrapper";
import AuthLayout from "@/components/auth/AuthLayout";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/all/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={cn(
          geistSans.className,
          geistMono.className,
          "antialiased text-primary bg-seniorbankWhite "
        )}
      >
        <SessionWrapper>
          <AuthLayout>
            <Toaster />
            <NavBar />
            <div className="mx-auto px-2 md:px-0 max-w-4xl">{children} </div>
          </AuthLayout>
        </SessionWrapper>
      </body>
    </html>
  );
}
