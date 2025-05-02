"use client";

import type React from "react";
import { Button } from "@/ui/atoms/Button";

interface Props {
  termsAccepted: boolean;
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ThirdStep = ({
  termsAccepted,
  setTermsAccepted,
  handleNextStep,
}: Props) => {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-seniorBankDarkBlue">
        Vilkår og betingelser
      </h1>

      <div className="max-h-[400px] w-full overflow-y-auto rounded-lg border-2 border-seniorBankDarkBlue bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Vilkår for bruk av SeniorBank
        </h2>

        <div className="space-y-4 text-seniorBankDarkBlue">
          <p>
            <strong>1. Generelt</strong>
            <br />
            Disse vilkårene gjelder for bruk av SeniorBank sine tjenester. Ved å
            bruke våre tjenester aksepterer du disse vilkårene.
          </p>

          <p>
            <strong>2. Tjenester</strong>
            <br />
            SeniorBank tilbyr banktjenester spesielt tilpasset seniorer.
            Tjenestene inkluderer kontoer, betalingstjenester, og rådgivning.
          </p>

          <p>
            <strong>3. Ansvar</strong>
            <br />
            SeniorBank er ikke ansvarlig for tap som skyldes forhold utenfor vår
            kontroll, inkludert tekniske problemer eller feil fra tredjepart.
          </p>

          <p>
            <strong>4. Sikkerhet</strong>
            <br />
            Du er ansvarlig for å holde dine påloggingsdetaljer hemmelige og
            sikre. Meld fra umiddelbart hvis du mistenker uautorisert bruk.
          </p>

          <p>
            <strong>5. Personvern</strong>
            <br />
            Vi behandler dine personopplysninger i henhold til gjeldende
            personvernlovgivning. Se vår personvernerklæring for mer
            informasjon.
          </p>

          <p>
            <strong>6. Endringer</strong>
            <br />
            SeniorBank kan endre disse vilkårene. Vesentlige endringer vil bli
            varslet på forhånd.
          </p>

          <p>
            <strong>7. Oppsigelse</strong>
            <br />
            Du kan når som helst avslutte ditt kundeforhold med SeniorBank. Vi
            kan også avslutte kundeforholdet med rimelig varsel.
          </p>

          <p>
            <strong>8. Gjeldende lov</strong>
            <br />
            Disse vilkårene er underlagt norsk lov.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center gap-3">
        <input
          type="checkbox"
          id="accept-terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="h-6 w-6 rounded border-2 border-seniorBankDarkBlue"
        />
        <label
          htmlFor="accept-terms"
          className="text-lg font-medium text-seniorBankDarkBlue"
        >
          Jeg godkjenner vilkårene og betingelsene
        </label>
      </div>

      <form onSubmit={handleNextStep} className="w-full">
        <Button
          type="submit"
          disabled={!termsAccepted}
          className={`w-full rounded-xl py-6 text-3xl font-medium text-white ${
            termsAccepted
              ? "bg-seniorBankDarkBlue hover:bg-blue-800"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          Neste steg
        </Button>
      </form>
    </div>
  );
};

export default ThirdStep;
