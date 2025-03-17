import { ShieldAlert } from "lucide-react";
import { BackgroundGraphic } from "../ui/BackgroundGraphic";

export function WarningSection() {
  return (
    <div className="flex flex-col justify-center pt-48 text-seniorbankWhite">
      <BackgroundGraphic
        variant="bottom-halfcircle"
        className="text-[#015aa4]"
      />

      <div className="mt-16 flex w-full justify-center">
        <div className="mx-auto flex max-w-4xl gap-4 px-12">
          <div className="flex flex-col justify-center">
            <ShieldAlert className="size-16 md:size-24" />
          </div>
          <div className="flex flex-col align-middle">
            <p className="mt-2 font-bold text-seniorbankWhite md:text-xl">
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
