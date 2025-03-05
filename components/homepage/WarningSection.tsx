import { ShieldAlert } from "lucide-react";

export function WarningSection() {
  return (
    <div className="text-seniorbankWhite flex justify-end h-[500px] relative flex-col py-8 px-64">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width={100}
        height={100}
        className="absolute top-0 left-0 w-full h-[500px] z-[-1] text-[#015aa4]"
      >
        <path d="M0 100 L0 50 Q50 0 100 50 L100 100" fill="currentColor" />
      </svg>
      <div className="flex gap-4 px-12 py-36">
        <div className="flex flex-col justify-center">
          <ShieldAlert className="size-24" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-seniorbankWhite font-bold mt-2 text-xl">
            Husk: Banken eller politiet vil aldri be deg om å overføre penger
            til en ukjent konto. Hvis du er usikker, ta kontakt med banken din
            eller din trygghetskontakt
          </p>
        </div>
      </div>
    </div>
  );
}
