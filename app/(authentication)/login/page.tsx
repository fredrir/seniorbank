import { ShieldIcon } from "lucide-react";
import LoginButton from "./(components)/LoginButton";

export default function LoginPage() {
  return <div className="flex min-h-screen flex-col items-center justify-center bg-seniorbankWhite text-black">
    <div className="mb-8 text-center">
      <ShieldIcon className="mx-auto mb-4 h-16 w-16" />
      <h1 className="text-4xl font-bold">Seniorbank</h1>
      <p className="mt-2 text-seniorbankBlue">
        Sikker tilgang til din økonomi
      </p>
    </div>
    <LoginButton />
  </div>
}