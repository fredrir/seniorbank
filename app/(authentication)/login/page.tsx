import LoginButton from "@/ui/atoms/LoginButton";
import { ShieldIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-seniorbankWhite text-black">
      <div className="absolute top-4 w-full px-4 text-center">
        <div className="mx-auto max-w-lg rounded-lg bg-gradient-to-r from-seniorbankBlue/10 to-seniorbankBlue/20 p-3 shadow-md backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-full bg-seniorbankBlue/20 p-1">
              <ShieldIcon className="h-4 w-4 text-seniorBankDarkBlue" />
            </div>
            <p className="text-sm font-medium tracking-wide text-seniorBankDarkBlue">
              Dette er kun et bachelor prosjekt, ikke et Sparebank 1 produkt.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8 text-center">
        <ShieldIcon className="mx-auto mb-4 h-16 w-16" />
        <h1 className="text-4xl font-bold">Seniorbank</h1>
        <p className="mt-2 text-seniorBankDarkBlue">
          Sikker tilgang til din økonomi
        </p>
      </div>
      <LoginButton />
    </div>
  );
}
