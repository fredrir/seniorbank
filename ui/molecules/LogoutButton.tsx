"use client";

import { cva, VariantProps } from "class-variance-authority";
import { signOut } from "next-auth/react";

const variants = cva(
  "ml-8 rounded-lg px-6 py-2 text-2xl text-[#002776] hover:opacity-80",
  {
    variants: {
      variant: {
        contact: "underline",
        seniorbank: "bg-[#D3D3EA] font-bold",
      },
    },
    defaultVariants: {
      variant: "seniorbank",
    },
  },
);

export function LogoutButton(props: VariantProps<typeof variants>) {
  const handleLogout = () =>
    signOut({
      callbackUrl: "/",
      redirect: true,
    });

  return (
    <button className={variants(props)} onClick={handleLogout}>
      Logg ut
    </button>
  );
}
