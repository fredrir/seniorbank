"use client";

import { Button } from "@/ui/atoms/Button";
import { LockIcon } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  const handleLogin = () => {
    signIn(
      "auth0",
      {
        callbackUrl: "/",
      },
      { connection: "google-oauth2" },
    );
  };

  return (
    <Button
      onClick={handleLogin}
      className="flex flex-row items-center justify-center rounded-lg bg-seniorBankDarkBlue px-4 py-2 text-white hover:bg-blue-700"
    >
      <LockIcon className="mr-2 h-4 w-4" />
      Logg inn
    </Button>
  );
};

export default LoginButton;
