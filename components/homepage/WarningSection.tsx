import { ShieldAlert } from "lucide-react";

export function WarningSection() {
  return (
    <div className="text-seniorbankWhite flex justify-center flex-col pt-8 relative">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width={100}
        height={100}
        className="w-full h-[200px] md:h-[500px] z-[-1] text-[#015aa4]"
      >
        <path d="M0 100 L0 50 Q50 0 100 50 L100 100" fill="currentColor" />
      </svg>
      <div className="flex justify-center absolute w-full mt-16">
        <div className="gap-4 px-12 mx-auto max-w-4xl flex">
          <div className="flex flex-col justify-center">
            <ShieldAlert className="size-16 md:size-24" />
          </div>
          <div className="flex flex-col align-middle">
            <p className="text-seniorbankWhite font-bold mt-2 md:text-xl">
              Husk: Banken eller politiet vil aldri be deg om å overføre penger
              til en ukjent konto. Hvis du er usikker, ta kontakt med banken din
              eller din trygghetskontakt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
