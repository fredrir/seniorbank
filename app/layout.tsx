import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/auth/SessionWrapper";
import AuthLayout from "@/components/auth/AuthLayout";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-seniorbankWhite text-black `}
      >
        <SessionWrapper>
          <AuthLayout>
            <NavBar />
            <div>{children} </div>
          </AuthLayout>
        </SessionWrapper>
      </body>
    </html>
  );
}
