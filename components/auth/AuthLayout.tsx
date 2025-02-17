"use client";
import { ReactNode } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { ShieldIcon, LockIcon } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { data: session, status } = useSession();

  const handleLogin = () =>
    signIn("auth0", {
      callbackUrl: "/",
    });

  if (status === "loading") {
    return (
      <div className="flex-grow min-h-screen text-black bg-seniorbankWhite flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin border-seniorbankBlue rounded-full h-16 w-16 border-y-2  mb-4"></div>
          <h2 className="text-2xl font-semibold text-seniorbankBlue">
            Laster inn banken...
          </h2>
          <p className="text-blue-400 mt-2">
            Vennligst vent mens vi henter informasjonen din
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-seniorbankWhite text-black ">
        <div className="mb-8 text-center">
          <ShieldIcon className="mx-auto mb-4 h-16 w-16" />
          <h1 className="text-4xl font-bold">Seniorbank</h1>
          <p className="mt-2 text-seniorbankBlue">
            Sikker tilgang til din økonomi
          </p>
        </div>
        <Button
          onClick={() => handleLogin()}
          className="bg-white text-rif-darkBlue hover:bg-blue-100"
        >
          <LockIcon className="mr-2 h-4 w-4" />
          Logg inn
        </Button>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default AuthLayout;
