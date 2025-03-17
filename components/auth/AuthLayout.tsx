import { ReactNode } from "react";
import Link from "next/link";
import { ShieldIcon, LockIcon } from "lucide-react";
import { getServerSession } from "next-auth";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await getServerSession();

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
        <Link
          href="/api/auth/signin"
          className="flex flex-row justify-center bg-seniorBankDarkBlue text-white px-4 py-2 rounded-lg items-center hover:bg-blue-700"
        >
          <LockIcon className="mr-2 h-4 w-4" />
          Logg inn
        </Link>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default AuthLayout;
