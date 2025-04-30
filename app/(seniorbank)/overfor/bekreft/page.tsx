"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/ui/atoms/Button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/ui/atoms/Card";
import { Label } from "@radix-ui/react-label";
import { useSearchParams, useRouter } from "next/navigation";

export default function Confirm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const from = searchParams.get("from") || "Ukjent";
  const to = searchParams.get("to") || "Ukjent";
  const amount = searchParams.get("amount") || "0";
  //const comment = searchParams.get("comment") || "";

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  const handleConfirm = () => {
    console.log("Overføring bekreftet");
    router.push("/overfor/bekreft/bekreftelse");
  };

  const handleCancel = () => {
    console.log("Overføring avbrutt");
    router.push("/overfor");
  };

  return (
    <main className="container mx-auto">
      <h1
        ref={headingRef}
        className="mb-8 mt-16 text-5xl font-bold text-seniorBankDarkBlue"
        tabIndex={-1}
      >
        Bekreft overføring
      </h1>

      <div className="flex w-full justify-center">
        <Card className="w-full max-w-[480px] bg-[#D3D3EA] px-5 pt-14 font-bold">
          <CardHeader className="flex flex-row justify-between">
            <CardDescription className="text-lg text-seniorBankDarkBlue">
              Du er i ferd med å overføre
            </CardDescription>
            <CardDescription className="text-lg font-bold text-seniorBankDarkBlue">
              {amount} kr
            </CardDescription>
          </CardHeader>

          <CardContent className="text-seniorBankDarkBlue">
            <div className="mb-5">
              <Label htmlFor="from-account" className="mb-1 block">
                Fra konto
              </Label>
              <article
                id="from-account"
                className="rounded-sm border border-seniorBankDarkBlue bg-[#F2F2F9] px-4 py-2"
                aria-label={`Fra konto: ${from}`}
              >
                {from}
              </article>
            </div>

            <div>
              <Label htmlFor="to-account" className="mb-1 block">
                Til konto
              </Label>
              <article
                id="to-account"
                className="mb-5 rounded-sm border border-seniorBankDarkBlue bg-[#F2F2F9] px-4 py-2"
                aria-label={`Til konto: ${to}`}
              >
                {to}
              </article>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              onClick={handleCancel}
              variant={"destructive"}
              size={"lg"}
              className="border border-seniorBankDarkBlue"
              aria-label="Avbryt overføring"
            >
              Avbryt
            </Button>
            <Button
              onClick={handleConfirm}
              size={"lg"}
              className="ml-20 w-full"
              aria-label="Bekreft overføring"
            >
              Bekreft
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
