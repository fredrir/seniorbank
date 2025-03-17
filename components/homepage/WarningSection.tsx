import { ShieldAlert } from "lucide-react";
import { BackgroundGraphic } from "../ui/BackgroundGraphic";

export function WarningSection() {
  return (
    <div className="text-seniorbankWhite flex justify-center flex-col pt-48">
      <BackgroundGraphic variant="bottom-halfcircle" className="text-[#015aa4]" />

      <div className="flex justify-center w-full mt-16">
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
