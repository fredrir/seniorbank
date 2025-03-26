import { ChevronRight } from "lucide-react";

interface Props {
  setFormData: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      birthDate: string;
      phoneNumber: string;
      address: string;
      difficulty: string;
    }>
  >;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const FirstStep = ({ setFormData, setStep }: Props) => {
  const difficulties = [
    {
      id: 1,
      level: "Basis nivå",
      enum: "EASY",
      description: [
        "De fleste funksjoner er forenklet",
        "Kun bassifunksjoner som saldooversikt og betaling av faste regninger",
        "Viktige handlinger må godkjennes av din Trygghetskontakt før de blir gjennomført",
      ],
    },

    {
      id: 2,
      level: "Moderert kontroll",
      enum: "MEDIUM",
      description: [
        "Litt flere muligheter, som å betale nye regninger og overføre mellom egne kontoer",
        "Advarsler ved ukjente mottakere eller større transaksjoner",
        "Enkel varsling til Trygghetskomtakt ved behov",
      ],
    },
    {
      id: 3,
      level: "Full frihet",
      enum: "HARD",
      description: [
        "Alle funksjoner tilgjengelige, inkludert investeringer, uten bekrensninger",
        "Du kan fortsatt velge å varsle din trygghetskontakt ved større eller uvanlige transaksjoner",
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h3 className="mt-16 max-w-sm text-center text-3xl font-bold text-seniorBankDarkBlue">
        Tilpass nettbanken til dine behov
      </h3>
      {difficulties.map((difficulty, index) => (
        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              difficulty: difficulty.enum,
            }));
            setStep(2);
          }}
          key={index}
          className="group relative flex w-full max-w-2xl flex-col gap-4 rounded-2xl border-4 border-seniorBankDarkBlue bg-[#D3D3EA] p-4 hover:border-blue-500"
        >
          <h2 className="text-4xl font-bold text-seniorBankDarkBlue">
            {difficulty.level}
          </h2>

          <article className="p-4">
            {difficulty.description.map((desc, index) => (
              <div
                key={index}
                className="flex text-lg font-semibold text-seniorBankDarkBlue"
              >
                <span className="mr-2">•</span>
                <span>{desc}</span>
              </div>
            ))}
          </article>

          <ChevronRight className="absolute right-4 top-4 size-16 text-seniorBankDarkBlue transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      ))}
    </div>
  );
};

export default FirstStep;
