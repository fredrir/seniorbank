"use client";

import { Button } from "@/ui/atoms/Button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/ui/atoms/card";
import { Input } from "@/ui/atoms/Input";
import { Label } from "@radix-ui/react-label";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Cornfirm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get("from") || "Ukjent";
  const to = searchParams.get("to") || "Ukjent";
  const amount = searchParams.get("amount") || "0";
  //const comment = searchParams.get("comment") || "";

  const handleConfirm = () => {
    console.log("Overføring bekreftet");
    router.push("/overfor/confirm/confirmation");
  }
  const handleCancel = () => {
    console.log("Overføring avbrutt");
    router.push("/overfor");
  }

  return (
    <section className="container mx-auto">
      <h1 className="mb-8 mt-16 text-5xl font-bold text-seniorBankDarkBlue">
        Overfør
      </h1>
      <div className="flex w-full justify-center">
        <Card className="w-[480px] bg-[#D3D3EA] px-5 pt-14 font-bold">
          <CardHeader className="flex flex-row justify-between">
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
              onClick={handleCancel}
              variant={"destructive"}
              size={"lg"}
              className="border border-seniorBankDarkBlue">
              Avbryt
            </Button>
            <Button 
              onClick={handleConfirm}
              size={"lg"}
              className="ml-20 w-full">
              Bekreft
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
