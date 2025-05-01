import { Button } from "@/ui/atoms/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/atoms/Card";
import { Link, ChevronRight } from "lucide-react";

export default function TransferConfirmation({
  contactNotified,
}: {
  contactNotified: boolean;
}) {
  return (
    <Card className="w-[480px] items-center bg-[#D3D3EA] px-5 pt-14 text-seniorBankDarkBlue">
      <CardHeader className="text-center font-bold">
        <CardTitle className="mb-3 text-4xl">
          Overføringen er gjennomført
        </CardTitle>
        {contactNotified && (
          <CardDescription className="text-seniorBankDarkBlue">
            Trygghetskontakten er varslet
          </CardDescription>
        )}
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
  );
}
