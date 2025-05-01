"use client";
import { Timer, User, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/ui/atoms/Button";
import { Session } from "next-auth";
import {
  setPaymentDelayDays as setUserPaymentDelayDays,
  setDifficulty as setUserDifficulty,
} from "@/actions/user";
import { Difficulty } from "@/model/domain/user/User";

export const difficultyLevels = [
  {
    enum: "EASY" as const,
    title: "Basis nivå",
    description: [
      "De fleste funksjoner er forenklet",
      "Kun basisfunksjoner som saldooversikt og betaling av faste regninger",
      "Viktige handlinger må godkjennes av din Trygghetskontakt før de blir gjennomført",
    ],
  },
  {
    enum: "MEDIUM" as const,
    title: "Moderert kontroll",
    description: [
      "Litt flere muligheter, som å betale nye regninger og overføre mellom egne kontoer",
      "Advarsler ved ukjente mottakere eller større transaksjoner",
      "Enkel varsling til Trygghetskontakt ved behov",
    ],
  },
  {
    enum: "HARD" as const,
    title: "Full frihet",
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

      {/* Profil */}
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

      {/* Betaingsutsettelse */}
      <div>
        <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl">
          <Timer></Timer>
          Betalingsutsettelse
        </h2>
        <p className="mt-5 font-bold">
          Velge ny betalingsutsettelse for dine betalinger{" "}
          <span className="text-seniorBankLightBlue">
            <i>- dette vil varsle din tryggehetskontakt</i>
          </span>
        </p>
        <p className="mb-5 mt-5 border border-seniorBankLightBlue bg-seniorBankWhitePurple text-seniorbankBlue">
          Dine nåværende betalinger har en utsatt dato på:{" "}
          <strong>{session?.user?.paymentDelayDays ?? "ukjent"} dager</strong>
        </p>

        <label className="mt-5 font-semibold">
          Velg antall dager på ny betalingsutsettelse{" "}
          <p className="font-thin text-seniorBankLightBlue">
            (minimum 3 dager)
          </p>{" "}
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
          className="ml-10 mt-4 rounded-md bg-seniorBankLightGreen px-3 py-2 text-sm text-white hover:bg-seniorBankGreen"
          onClick={handlePaymentDelayChange}
        >
          Oppdater betalingsutsettelse
        </Button>
      </div>

      {/* Sikkerhetsnivå */}
      <div>
        <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl">
          <Lock /> Sikkerhetsnivå
        </h2>
        <p className="mb-2 mt-5 font-bold">
          Du kan endre sikkerhetsnivået ditt{" "}
          <span className="text-seniorBankLightBlue">
            <i>- dette vil varsle din tryggehetskontakt</i>
          </span>
        </p>

        <div className="mt-7 max-w-xl rounded-xl border border-seniorbankBlue bg-seniorBankLightPink px-3 py-3">
          <p className="mt-6 font-extrabold">
            Ditt nåværende nivå: <strong>{currentLevel?.title}</strong>
          </p>
          <ul className="mt-3 list-disc pl-20">
            {currentLevel?.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>

        <h2 className="mb-3 mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-3xl">
          VELG NYTT NIVÅ
        </h2>

        {otherLevels.map((level, i) => (
          <button
            key={i}
            onClick={() => handleLevelChange(level.enum)}
            className="mb-4 w-full max-w-xl rounded-xl border border-seniorBankDarkBlue bg-seniorBankLightPurple px-4 py-4 text-left hover:bg-seniorBankLightBlue"
          >
            <h3 className="text-xl font-bold text-seniorBankDarkBlue">
              {level.title}
            </h3>
            <ul className="mt-2 list-disc pl-6 text-xl">
              {level.description.map((desc, j) => (
                <li key={j}>{desc}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </section>
  );
}
