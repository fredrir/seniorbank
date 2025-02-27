import { tParams } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ProgressBar } from "@/components/all/ProgressBar";

export default async function RegisterAccountStepPage(props: {
  params: tParams;
}) {
  const { id } = await props.params;

  return (
    <main>
      <header className="flex flex-row gap-2 mt-8 items-center text-seniorBankDarkBlue">
        <Link href={id === "1" ? "/register" : `/register/${Number(id) - 1}`}>
          <ChevronLeft className="size-16" />
        </Link>

        <h2 className="text-4xl font-bold">Fyll ut din informasjon</h2>
      </header>

      <div className="flex flex-col items-center mt-16">
        <div className="bg-[#D3D3EA] p-4 rounded-2xl w-full max-w-2xl">
          <ProgressBar totalSteps={3} currentStep={Number(id)} />
        </div>
      </div>
    </main>
  );
}
