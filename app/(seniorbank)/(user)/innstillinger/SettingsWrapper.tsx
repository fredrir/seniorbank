"use client";
import { Timer, User, Lock } from "lucide-react";
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

  const [selectedDelay, setSelectedDelay] = useState("3");

  const handlePaymentDelayChange = async () => {
    try {
      const err = await setUserPaymentDelayDays(Number(selectedDelay));

      if (err) throw new Error("Kunne ikke oppdatere");
      window.location.reload();
    } catch (err) {
      console.error("Feil under betalingsutsettelse:", err);
      alert("Kunne ikke oppdatere betalingsutsettelse.");
    }
  };

  return (
    <section className="space-y-6 py-6 text-lg sm:text-xl">
      <h3 className="mt-7 text-4xl font-bold text-seniorBankDarkBlue sm:text-5xl">
        Dine innstillinger
      </h3>
      <p className="">
        Her vil du få en oversikt over dine innstillinger og hva som er lagret
        om deg
      </p>

      <div className="max-w-xl rounded-xl border border-seniorbankBlue bg-seniorBankLightBlue px-2 py-2">
        <h4 className="mb-5 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl">
          <User className="text-40xl mt-2" />
          Din profil
        </h4>
        <ul className="mt-4 space-y-4">
          <li>
            <strong>Navn:</strong> {session?.user?.name || "Ikke oppgitt"}
          </li>
          <li>
            <strong>E-post:</strong> {session?.user?.email || "Ikke oppgitt"}
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl">
          <Timer></Timer>
          Betalingsutsettelse
        </h2>
        <p className="mt-5 font-bold">
          Velge ny betalingsutsettelse for dine betalinger{" "}
          <span className="text-seniorBankBlue font-semibold">
            <i>- dette vil varsle din tryggehetskontakt</i>
          </span>
        </p>
        <p className="mb-5 mt-5 border border-seniorBankLightBlue bg-seniorBankWhitePurple text-seniorbankBlue">
          Dine nåværende betalinger har en utsatt dato på:{" "}
          <strong className="text-seniorBankDarkBlue">
            {session?.user?.paymentDelayDays ?? "ukjent"} dager
          </strong>
        </p>

        <label className="mt-5 font-semibold">
          Velg antall dager på ny betalingsutsettelse{" "}
          <p className="font-thin text-seniorBankDarkBlue">(minimum 3 dager)</p>{" "}
          <br></br>
          <select
            value={selectedDelay}
            onChange={(e) => setSelectedDelay(e.target.value)}
            className="mt-2 rounded border px-3 py-2"
          >
            <option value="3">3 dager</option>
            <option value="4">4 dager</option>
            <option value="5">5 dager</option>
            <option value="1">6 dag</option>
            <option value="2">7 dager</option>
          </select>
        </label>

        <Button
          className="ml-10 mt-4 rounded-md bg-seniorbankBlue scroll-px-36 py-6 text-2xl text-white hover:bg-seniorBankLightBlue hover:text-seniorBankDarkBlue max-w-fit"
          onClick={handlePaymentDelayChange}
        >
          Oppdater betalingsutsettelse
        </Button>
      </div>

      <div>
        <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl">
          <Lock /> Forenklingsnivå
        </h2>
        <p className="mb-2 mt-5 font-bold">
          Du kan endre sikkerhetsnivået ditt{" "}
          <span className="text-seniorBankBlue font-semibold">
            <i>- dette vil varsle din tryggehetskontakt</i>
          </span>
        </p>

        <div className="mt-7 max-w-full rounded-xl border border-seniorbankBlue bg-seniorBankLightPink px-4 py-3">
          <p className="mt-6 font-extrabold">
          Ditt nåværende nivå: <strong>{currentLevel?.title}</strong>
          </p>
          <ul className="mt-3 mb-3 list-disc pl-20">
            {currentLevel?.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>

        <h2 className="mb-6 mt-16 text-xl font-bold text-seniorBankDarkBlue sm:text-3xl">
        Trykk på en av boksene for å velge nytt forenklingsnivå - Det kan alltids endre senere
        </h2>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {otherLevels.map((level, i) => (
            <button
              key={i}
              onClick={() => handleLevelChange(level.enum)}
              className="focus:ring-seniorBankBlue group relative w-full rounded-xl border-2 border-seniorBankDarkBlue bg-seniorBankLightPurple p-6 text-left transition-all duration-300 hover:bg-seniorBankLightBlue hover:shadow-lg focus:outline-none focus:ring-2"
            >
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-seniorBankDarkBlue opacity-70 transition-all group-hover:bg-seniorBankDarkBlue group-hover:text-white group-hover:opacity-100">
                <Lock className="h-4 w-4" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-seniorBankDarkBlue">
                {level.title}
              </h3>
              <ul className="mt-2 space-y-2">
                {level.description.map((desc, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <div className="mt-1 text-seniorBankDarkBlue">•</div>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <span className="bg-seniorBankBlue inline-block rounded-full px-4 py-2 font-medium text-seniorBankDarkBlue transition-transform group-hover:bg-seniorBankDarkBlue group-hover:text-white">
                  Velg dette nivået
                </span>
              </div>
            </button>
          ))}
        </section>
      </div>
    </section>
  );
}
