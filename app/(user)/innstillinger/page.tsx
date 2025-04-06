"use client";
import { useSession } from "next-auth/react";
import { Timer, User, Lock } from "lucide-react";
import { difficultyLevels } from "@/components/security-settings/difficultyLevels";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { data: session } = useSession();

  const currentLevel = difficultyLevels.find(
    (d) => d.enum === session?.user.difficulty
  );
  const otherLevels = difficultyLevels.filter(
    (d) => d.enum !== session?.user.difficulty
  );

  const handleLevelChange = async (newLevel: string) => {
    const confirmation = window.confirm(
        "Er du sikker på at du ønsker å endre ditt sikkerhetsnivå? Husk at dette vil varsle din tryggehtskontakt" 
    );
    
    if(!confirmation) return; 


    try {
      const res = await fetch("/api/update-difficulty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newDifficulty: newLevel }),
      });

      if (!res.ok) throw new Error("Feil ved oppdatering");
      window.location.reload(); 
    
    } catch (err) {
      console.error("Kunne ikke oppdatere:", err);
      alert("Noe gikk galt.");
    }
  };


  const [selectedDelay, setSelectedDelay] = useState("3");


  const handlePaymentDelayChange = async () => {
    try {
      const res = await fetch("/api/update-payment-delay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delayDays: selectedDelay }),
      });
  
      if (!res.ok) throw new Error("Kunne ikke oppdatere");
      window.location.reload(); 
    } catch (err) {
      console.error("Feil under betalingsutsettelse:", err);
      alert("Kunne ikke oppdatere betalingsutsettelse.");
    }
  };


  return (
    <section className="space-y-6 py-6 text-lg sm:text-xl">
      <h3 className="text-4xl font-bold text-seniorBankDarkBlue sm:text-5xl mt-7">
        Dine innstillinger
      </h3>
      <p className="">
                Her vil du få en oversikt over dine innstillinger og hva som er lagret om deg
            </p>


      {/* Profil */}
      <div className="border rounded-xl py-2 px-2 border-seniorbankBlue bg-seniorBankLightBlue max-w-xl">
        <h4 className="text-xl font-bold text-seniorBankDarkBlue sm:text-4xl mb-5">
          <User className="text-40xl mt-2" />
          Din profil
        </h4>
        <ul className="space-y-4 mt-4">
          <li><strong>Navn:</strong> {session?.user.name || "Ikke oppgitt"}</li>
          <li><strong>E-post:</strong> {session?.user.email || "Ikke oppgitt"}</li>
        </ul>
      </div>


         {/* Betaingsutsettelse */}
         <div>
            <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl ">
                <Timer></Timer>
                    Betalingsutsettelse 
            </h2>
            <p className="font-bold mt-5">
                Velge ny betalingsutsettelse for dine betalinger <span className="text-seniorBankLightBlue"><i>- dette vil varsle din tryggehetskontakt</i></span>
                </p>
                <p className="mt-5 mb-5 border border-seniorBankLightBlue bg-seniorBankWhitePurple text-seniorbankBlue ">
                    Dine nåværende betalinger har en utsatt dato på: <strong>{session?.user?.paymentDelay ?? "ukjent"} dager</strong> 
                    </p>

                <label className="font-semibold mt-5">
                    Velg antall dager på ny betalingsutsettelse <p className="font-thin text-seniorBankLightBlue">(minimum 3 dager)</p> <br></br>
                    <select
                    value = {selectedDelay}
                    onChange={(e) => setSelectedDelay(e.target.value)}
                    className = "mt-2 px-3 py-2 border rounded"
                    >
                        <option value="3" selected>3 dager</option>
                        <option value="4">4 dager</option>
                        <option value="5">5 dager</option>
                        <option value="1">6 dag</option>
                        <option value="2">7 dager</option>
                    </select>
                </label>

                <Button className="mt-4 ml-10 bg-seniorBankLightGreen text-white text-sm px-3 py-2 rounded-md hover:bg-seniorBankGreen"onClick={handlePaymentDelayChange}>
                    Oppdater betalingsutsettelse 
                </Button>
            </div>

                   

      {/* Sikkerhetsnivå */}
      <div>
        <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl">
          <Lock /> Sikkerhetsnivå
        </h2>
        <p className="font-bold mt-5 mb-2">
          Du kan endre sikkerhetsnivået ditt <span className="text-seniorBankLightBlue"><i>- dette vil varsle din tryggehetskontakt</i></span>
        </p>

        <div className="border border-seniorbankBlue bg-seniorBankLightPink rounded-xl px-3 max-w-xl py-3 mt-7">
          <p className="mt-6 font-extrabold">
            Ditt nåværende nivå: <strong>{currentLevel?.title}</strong>
          </p>
          <ul className="mt-3 list-disc pl-20">
            {currentLevel?.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>

        <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-3xl mb-3">
          VELG NYTT NIVÅ
        </h2>

        {otherLevels.map((level, i) => (
          <button
            key={i}
            onClick={() => handleLevelChange(level.enum)}
            className="border border-seniorBankDarkBlue bg-seniorBankLightPurple rounded-xl px-4 py-4 max-w-xl w-full mb-4 text-left hover:bg-seniorBankLightBlue"
          >
            <h3 className="text-lg font-bold text-seniorBankDarkBlue text-xl">{level.title}</h3>
            <ul className="mt-2 list-disc pl-6 text-sm text-xl">
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
