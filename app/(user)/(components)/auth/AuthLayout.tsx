import { ReactNode } from "react";
import { ShieldIcon } from "lucide-react";
import LoginButton from "./LoginButton";
import { getSession } from "next-auth/react";
import RegisterAccountPage from "@/app/(components)/register/RegisterAccount";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  let session;
  try {
    session = await getSession();

    if (!session) {
      throw new Error("No session found");
    }

  } catch {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-seniorbankWhite text-black">
        <div className="mb-8 text-center">
          <ShieldIcon className="mx-auto mb-4 h-16 w-16" />
          <h1 className="text-4xl font-bold">Seniorbank</h1>
          <p className="mt-2 text-seniorbankBlue">
            Sikker tilgang til din økonomi
          </p>
        </div>
        <LoginButton />
      </div>
    );
  }
  
  if (session.user === null) {
    return <RegisterAccountPage session={session} />;
  } else {
    return <>{children}</>;
  }
};

export default AuthLayout;
