"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

export default function Cornfirm() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "Ukjent";
  const to = searchParams.get("to") || "Ukjent";
  const amount = searchParams.get("amount") || "0";
  const comment = searchParams.get("comment") || "";

  return (
    <section className="container mx-auto">
      <h1 className="mb-8 mt-16 text-5xl font-bold text-seniorBankDarkBlue">
        Overfør
      </h1>
      <div className="flex w-full justify-center">
        <Card className="w-[480px] bg-[#D3D3EA] px-5 pt-14 font-bold">
          <CardHeader className="d flex flex-row justify-between">
            <CardDescription className="text-seniorBankDarkBlue">
              Du er i ferd med å overføre
            </CardDescription>
            <CardDescription className="text-seniorBankDarkBlue">
              {amount} kr
            </CardDescription>
          </CardHeader>
          <CardContent className="text-seniorBankDarkBlue">
            <Label>fra konto</Label>
            <Input
              value={from}
              readOnly
              className="mb-5 rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9]"
            />

            <Label>til konto</Label>
            <Input
              value={to}
              readOnly
              className="mb-5 rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9]"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant={"destructive"}
              size={"lg"}
              className="border border-seniorBankDarkBlue"
            >
              <Link href="/overfor">Avbryt</Link>
            </Button>
            <Button size={"lg"} className="ml-20 w-full">
              <Link href="/overfor/confirm/confirmation">Bekreft</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
