"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Banknote } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Overfor() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    {
      /*console.log("Fra konto:", fromAccount);
		console.log("Til konto:", toAccount);
		console.log("Antall:", amount);
		console.log("Kommentar:", comment);*/
    }

    if (!fromAccount || !toAccount || !amount) {
      setError("Vennligst fyll inn alle obligatoriske felt.");
      return;
    }
    setError("");

    const query = new URLSearchParams({
      from: fromAccount,
      to: toAccount,
      amount,
      comment,
    }).toString();

    router.push(`/overfor/confirm?${query}`);
  };

  return (
    <section className="container mx-auto">
      <h2 className="mb-4 ml-36 mt-4 text-5xl font-bold text-seniorBankDarkBlue">
        Overfør
      </h2>
      <div className="flex w-full justify-center">
        <Card className="w-[480px] bg-[#D3D3EA] px-5 pt-14">
          <form onSubmit={handleSubmit}>
            <CardContent className="text-seniorBankDarkBlue">
              <Label>Fra konto:*</Label>
              <div className="mb-3">
                <Select value={fromAccount} onValueChange={setFromAccount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brukskonto - 18 932,54 kr">
                      Brukskonto - 18 932,54 kr
                    </SelectItem>
                    <SelectItem value="Sparekonto - 829 182,92 kr">
                      Sparekonto - 829 182,92 kr
                    </SelectItem>
                    <SelectItem value="Barnebarn  - 34 835 kr">
                      Barnebarn - 34 835 kr
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Label>Til konto:*</Label>
              <div className="mb-3">
                <Select onValueChange={setToAccount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brukskonto - 18 932,54 kr">
                      Brukskonto - 18 932,54 kr
                    </SelectItem>
                    <SelectItem value="Sparekonto - 829 182,92 kr">
                      Sparekonto - 829 182,92 kr
                    </SelectItem>
                    <SelectItem value="Barnebarn  - 34 835 kr">
                      Barnebarn - 34 835 kr
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Label>Antall:*</Label>
              <div className="relative w-full">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mb-3 rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9]"
                />
                <Banknote className="absolute right-3 top-0 size-8 font-bold" />
              </div>

              <Label>Kommentar:</Label>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-3 h-32 rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9]"
              />
              {error && (
                <p className="mt-2 font-medium text-red-600">{error}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="w-1/2 bg-seniorBankDarkBlue text-xl font-bold text-seniorbankWhite"
              >
                {/*<Link href="/overfor/confirm">Bekreft
							</Link>*/}
                Bekreft
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
}
