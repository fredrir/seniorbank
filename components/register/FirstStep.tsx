import { ChevronRight } from "lucide-react";

interface Props {
  setFormData: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      birthDate: string;
      phoneNumber: string;
      address: string;
      email: string;
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
      description: [
        "De fleste funksjoner er forenklet",
        "Kun bassifunksjoner som saldooversikt og betaling av faste regninger",
        "Viktige handlinger må godkjennes av din Trygghetskontakt før de blir gjennomført",
      ],
    },

    {
      id: 2,
      level: "Moderert kontroll",
      description: [
        "Litt flere muligheter, som å betale nye regninger og overføre mellom egne kontoer",
        "Advarsler ved ukjente mottakere eller større transaksjoner",
        "Enkel varsling til Trygghetskomtakt ved behov",
      ],
    },
    {
      id: 3,
      level: "Full frihet",
      description: [
        "Alle funksjoner tilgjengelige, inkludert investeringer, uten bekrensninger",
        "Du kan fortsatt velge å varsle din trygghetskontakt ved større eller uvanlige transaksjoner",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8 mt-8  items-center w-full">
      <h3 className="text-3xl max-w-sm mt-16 font-bold text-seniorBankDarkBlue text-center">
        Tilpass nettbanken til dine behov
      </h3>
      {difficulties.map((difficulty, index) => (
        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              difficulty: difficulty.level,
            }));
            setStep(2);
          }}
          key={index}
          className="border-4 w-full max-w-2xl border-seniorBankDarkBlue hover:border-blue-500 bg-[#D3D3EA] rounded-2xl p-4 flex flex-col gap-4 relative group"
        >
          <h2 className="text-4xl font-bold text-seniorBankDarkBlue">
            {difficulty.level}
          </h2>

          <article className="p-4">
            {difficulty.description.map((desc, index) => (
              <div
                key={index}
                className="text-seniorBankDarkBlue flex text-lg font-semibold"
              >
                <span className="mr-2">•</span>
                <span>{desc}</span>
              </div>
            ))}
          </article>

          <ChevronRight className="size-16 absolute top-4 right-4 text-seniorBankDarkBlue group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      ))}
    </div>
  );
};

export default FirstStep;
