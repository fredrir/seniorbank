"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleLogout = () =>
    signOut({
      callbackUrl: "/",
      redirect: true,
    });

  return <button
    className="ml-8 rounded-lg bg-[#D3D3EA] px-6 py-2 text-2xl font-bold text-[#002776] hover:opacity-80"
    onClick={handleLogout}
  >
    Logg ut
  </button>
}