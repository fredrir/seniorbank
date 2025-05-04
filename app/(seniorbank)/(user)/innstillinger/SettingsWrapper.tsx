"use client";
import { Timer, User, Lock, Shield, AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/ui/atoms/Button";
import type { Session } from "next-auth";
import {
  setPaymentDelayDays as setUserPaymentDelayDays,
  setDifficulty as setUserDifficulty,
} from "@/actions/user";
import type { Difficulty } from "@/model/domain/user/User";

export const difficultyLevels = [
  {
    enum: "EASY" as const,
    title: "Nivå 3 - Høy grad av forenkling",
    description: [
      "De fleste funksjoner er forenklet",
      "Kun basisfunksjoner som saldooversikt og betaling av faste regninger",
      "Viktige handlinger må godkjennes av din Trygghetskontakt før de blir gjennomført",
    ],
  },
  {
    enum: "MEDIUM" as const,
    title: "Nivå 2 - Moderat forenkling",
    description: [
      "Litt flere muligheter, som å betale nye regninger og overføre mellom egne kontoer",
      "Advarsler ved ukjente mottakere eller større transaksjoner",
      "Enkel varsling til Trygghetskontakt ved behov",
    ],
  },
  {
    enum: "HARD" as const,
    title: "Nivå 1 - Lite forenkling",
    description: [
      "Alle funksjoner tilgjengelige uten begrensninger",
      "Du kan fortsatt velge å varsle din trygghetskontakt ved større eller uvanlige transaksjoner",
    ],
  },
];

interface Props {
  session: Session | null;
}

export default function SettingsWrapper({ session }: Props) {
  const currentLevel = difficultyLevels.find(
    (d) => d.enum === session?.user?.difficulty,
  );
  const otherLevels = difficultyLevels.filter(
    (d) => d.enum !== session?.user?.difficulty,
  );

  const handleLevelChange = async (newLevel: Difficulty) => {
    const confirmation = window.confirm(
      "Er du sikker på at du ønsker å endre ditt sikkerhetsnivå? Husk at dette vil varsle din tryggehtskontakt",
    );

    if (!confirmation) return;

    try {
      const err = await setUserDifficulty(newLevel);

      if (err) throw new Error("Feil ved oppdatering");
      window.location.reload();
    } catch (err) {
      console.error("Kunne ikke oppdatere:", err);
      alert("Noe gikk galt.");
    }
  };

  const [selectedDelay, setSelectedDelay] = useState(
    session?.user?.paymentDelayDays?.toString() ?? "3",
  );

  const handlePaymentDelayChange = async () => {
    try {
      const err = await setUserPaymentDelayDays(Number(selectedDelay));

      if (err) {
        console.error(err);
        throw new Error("Kunne ikke oppdatere");
      }
      window.location.reload();
    } catch (err) {
      console.error("Feil under betalingsutsettelse:", err);
      alert("Kunne ikke oppdatere betalingsutsettelse.");
    }
  };

  return (
    <section className="mx-auto max-w-5xl space-y-8 py-8 text-lg">
      <div className="mb-10 text-center">
        <h3 className="mb-4 text-4xl font-bold text-seniorBankDarkBlue sm:text-5xl">
          Dine innstillinger
        </h3>
        <p className="mx-auto max-w-2xl text-seniorBankDarkBlue/80">
          Her vil du få en oversikt over dine innstillinger og hva som er lagret
          om deg
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-seniorbankBlue bg-white shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between bg-seniorBankLightBlue p-4">
          <h4 className="text-2xl font-bold text-seniorBankDarkBlue">
            Din profil
          </h4>
          <div className="rounded-full bg-white p-2">
            <User className="size-8 text-seniorBankDarkBlue" />
          </div>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-36 font-semibold text-seniorBankDarkBlue">
                Navn:
              </div>
              <div className="flex-1">
                {session?.user?.name || "Ikke oppgitt"}
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-36 font-semibold text-seniorBankDarkBlue">
                E-post:
              </div>
              <div className="flex-1">
                {session?.user?.email || "Ikke oppgitt"}
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-36 font-semibold text-seniorBankDarkBlue">
                Mobilnummer:
              </div>
              <div className="flex-1">
                {session?.user?.phoneNumber || "Ikke oppgitt"}
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-36 font-semibold text-seniorBankDarkBlue">
                Adresse:
              </div>
              <div className="flex-1">
                {session?.user?.address || "Ikke oppgitt"}
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-36 font-semibold text-seniorBankDarkBlue">
                Fødselsdato:
              </div>
              <div className="flex-1">
                {session?.user?.birthDate
                  ? new Date(session.user.birthDate).toLocaleDateString("nb-NO")
                  : "Ikke oppgitt"}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-seniorbankBlue bg-white shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between bg-seniorBankLightBlue p-4">
          <h2 className="text-2xl font-bold text-seniorBankDarkBlue">
            Betalingsutsettelse
          </h2>
          <div className="rounded-full bg-white p-2">
            <Timer className="size-8 text-seniorBankDarkBlue" />
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex items-center gap-3 rounded-lg border border-seniorBankLightBlue bg-seniorBankWhitePurple p-4">
            <AlertCircle className="size-6 flex-shrink-0 text-seniorBankDarkBlue" />
            <p className="text-seniorbankBlue">
              Dine nåværende betalinger har en utsatt dato på:{" "}
              <strong className="text-seniorBankDarkBlue">
                {session?.user?.paymentDelayDays ?? "ukjent"} dager
              </strong>
            </p>
          </div>

          <div className="space-y-4">
            <label
              className="flex items-center gap-2 font-medium text-seniorBankDarkBlue"
              htmlFor="paymentDelay"
            >
              Velge ny betalingsutsettelse for dine betalinger
              <span className="text-seniorBankBlue ml-1 text-sm font-normal italic">
                (dette vil varsle din tryggehetskontakt)
              </span>
            </label>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <select
                value={selectedDelay}
                id="paymentDelay"
                onChange={(e) => setSelectedDelay(e.target.value)}
                className="w-full rounded-lg border-2 border-seniorBankLightBlue px-4 py-3 text-lg focus:border-seniorbankBlue focus:outline-none focus:ring focus:ring-seniorBankLightBlue/50 sm:w-auto"
              >
                <option value="3">3 dager</option>
                <option value="4">4 dager</option>
                <option value="5">5 dager</option>
                <option value="6">6 dager</option>
                <option value="7">7 dager</option>
              </select>

              <Button
                variant="default"
                className="py-6 text-xl"
                onClick={handlePaymentDelayChange}
              >
                <Check className="size-5" />
                Oppdater betalingsutsettelse
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-seniorbankBlue bg-white shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between bg-seniorBankLightBlue p-4">
          <h2 className="text-2xl font-bold text-seniorBankDarkBlue">
            Forenklingsnivå
          </h2>
          <div className="rounded-full bg-white p-2">
            <Shield className="size-8 text-seniorBankDarkBlue" />
          </div>
        </div>

        <div className="space-y-8 p-6">
          <div className="rounded-xl border-2 border-seniorbankBlue bg-seniorBankLightPink p-6">
            <p className="mb-3 text-xl font-bold text-seniorBankDarkBlue">
              Ditt nåværende nivå:{" "}
              <span className="text-seniorbankBlue">{currentLevel?.title}</span>
            </p>
            <ul className="space-y-2">
              {currentLevel?.description.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-1 size-5 flex-shrink-0 text-seniorBankDarkBlue" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-xl font-bold text-seniorBankDarkBlue sm:text-2xl">
                Velg nytt forenklingsnivå
              </h2>
              <p className="text-base text-seniorBankDarkBlue/70">
                (Dette vil varsle din tryggehetskontakt)
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {otherLevels.map((level, i) => (
                <button
                  key={i}
                  onClick={() => handleLevelChange(level.enum)}
                  className="focus:ring-seniorBankBlue group relative w-full rounded-xl border-2 border-seniorBankDarkBlue bg-white p-6 text-left transition-all duration-300 hover:bg-seniorBankLightPurple hover:shadow-lg focus:outline-none focus:ring-2"
                >
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-seniorBankDarkBlue bg-white text-seniorBankDarkBlue transition-all group-hover:bg-seniorBankDarkBlue group-hover:text-white">
                    <Lock className="h-5 w-5" />
                  </div>

                  <h3 className="mb-4 pr-10 text-xl font-bold text-seniorBankDarkBlue">
                    {level.title}
                  </h3>

                  <ul className="mb-6 space-y-3">
                    {level.description.map((desc, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="mt-1 flex-shrink-0 text-seniorBankDarkBlue">
                          •
                        </div>
                        <span className="text-base">{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    <span className="inline-block rounded-full bg-seniorBankLightBlue px-6 py-2 font-medium text-seniorBankDarkBlue transition-all group-hover:bg-seniorBankDarkBlue group-hover:text-white">
                      Velg dette nivået
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
