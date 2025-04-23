import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/ui/atoms/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/atoms/Card";

export default function Cornfirmation() {
  return (
    <section className="container mx-auto">
      <h1 className="mb-8 mt-16 text-5xl font-bold text-seniorBankDarkBlue">
        Overfør
      </h1>
      <div className="flex w-full justify-center">
        <Card className="w-[480px] items-center bg-[#D3D3EA] px-5 pt-14 text-seniorBankDarkBlue">
          <CardHeader className="text-center font-bold">
            <CardTitle className="mb-3 text-4xl">
              Overføringen er gjennomført
            </CardTitle>
            <CardDescription className="text-seniorBankDarkBlue">
              Trygghetskontrakten er varslet
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <div className="relative w-full">
              <Button className="mt-5 w-full bg-seniorBankDarkBlue text-xl font-bold text-seniorbankWhite">
                <Link href="/">Tilbake til hovedsiden</Link>
                <ChevronRight className="absolute right-1 size-10" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
