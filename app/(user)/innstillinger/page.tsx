import { getServerSession } from "next-auth";
import { authOptions } from "../../api/[auth]/[...nextauth]/authOptions";
import { Timer, User, Lock } from "lucide-react"; 
import { difficultyLevels } from "@/components/security-settings/difficultyLevels";



export default async function SettingsPage() {

  const session = await getServerSession(authOptions);
  const otherLevels = difficultyLevels.filter(
    (d) => d.enum !== session?.user.difficulty);
  const currentLevel = difficultyLevels.find(
    (d) => d.enum === session?.user.difficulty); 

  
    return(
        <section className="space-y-6 py-6 text-lg sm:text-xl">
            <h3 className="text-4xl font-bold text-seniorBankDarkBlue sm:text-5xl mt-7">
                Dine innstillinger
            </h3>
            <p className="">
                Her vil du få en oversikt over dine innstillinger og hva som er lagret om deg Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis recusandae ducimus ex incidunt ab fuga, voluptatum illo deserunt? Esse adipisci eveniet tempora dolore, perferendis quos totam unde. Iste, a sequi?
            </p>


            {/* Profilinformasjon */}
            <div className="border rounded-xl py-2 px-2 border-seniorbankBlue bg-seniorBankLightBlue max-w-xl">
                <h4 className="text-xl font-bold text-seniorBankDarkBlue sm:text-4xl mb-5">
                <User className="text-40xl mt-2"></User>
                    Din profil 
                </h4>
                <ul className="space-y-4 mt-4">
                    <li>
                    <strong>Navn:</strong> {session?.user.name || "Ikke oppgitt"}
                    </li>

                    <li>
                    <strong>E-post:</strong> {session?.user.email || "Ikke oppgitt"}
                    </li>
                </ul>
            </div>

             {/* Betaingsutsettelse */}
             <div>
                
                <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl ">
                <Timer></Timer>
                    Betalingsutsettelse 
                </h2>
                <p className="font-bold mt-5">
                    Her vil du få muligheten til å utsette velge ny betalingsdato for dine betalinger, vær OBS på at dette vil varsle din tryggehetskontakt
                </p>

                <p className="mt-3 mb-5">
                    Dine nåværende betalinger har en utsatt dato på: 3 dager 
    
                </p>

                <label className="font-semibold">
                    Velg en ny betalingsutsettelse
                    <select>
                        <option value="3" selected>3 dager</option>
                        <option value="4">4 dager</option>
                        <option value="5">5 dager</option>
                        <option value="1">6 dag</option>
                        <option value="2">7 dager</option>
                    </select>
                </label>
            </div>



            {/* Sikkerhetsnivå */}
            <div>
                <h2 className="mt-20 text-xl font-bold text-seniorBankDarkBlue sm:text-4xl">
                    <Lock></Lock>
                    Sikkerhetsnivå
                </h2>
                <p className="font-bold mt-5 mb-2">
                    Her vil du få muligheten til å endre sikkerhetsnivået ditt, vær OBS på at dette vil varsle din tryggehetskontakt
                </p>

                <div className="border border-seniorBankDarkBlue bg-seniorBankLightPink rounded-xl px-3 max-w-xl py-3 ">
                <p className="mt-6">
                    Ditt nåværende nivå: <strong>{currentLevel?.title}</strong>
                </p>

                <ul className="mt-3 list-disc pl-20 ">
                {currentLevel?.description.map((line, i) => (
                    <li key={i}>{line}</li>
                ))}
                </ul>
            </div>


            <h2 className="mt-20 text-xl font-bold text-seniorbankBlue sm:text-3xl mb-3">
                VELG NYTT NIVÅ
            </h2>

            

            {otherLevels.map((level, i) => (
            <button key={i} className="border border-seniorBankDarkBlue bg-seniorBankLightPurple rounded-xl px-4 py-4 max-w-xl w-full mb-4 text-left hover:bg-seniorBankLightBlue">
                <h3 className="text-lg font-bold text-seniorBankDarkBlue">{level.title}</h3>
                <ul className="mt-2 list-disc pl-6 text-sm">
                {level.description.map((desc, j) => (
                    <li key={j}>{desc}</li>
                ))}
                </ul>
            </button>
            ))}

                </div>
        </section>


           













    )
}