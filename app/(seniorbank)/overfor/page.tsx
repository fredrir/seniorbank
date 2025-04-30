"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/atoms/Button";
import { Input } from "@/ui/atoms/Input";
import { Label } from "@radix-ui/react-label";
import { Banknote } from "lucide-react";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";
import Heading from "@/ui/molecules/Heading";
import { Card, CardContent, CardFooter } from "@/ui/atoms/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/atoms/Select";
import { Textarea } from "@/ui/atoms/Textarea";

export default function Overfor() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fromAccount || !toAccount || !amount) {
      setError("Vennligst fyll inn alle obligatoriske felt.");
      return;
    }
    setError("");

    if (fromAccount === toAccount) {
      setError("Du kan ikke overføre penger til samme konto.");
      return;
    }

    const query = new URLSearchParams({
      from: fromAccount,
      to: toAccount,
      amount,
      comment,
    }).toString();

    router.push(`/overfor/bekreft?${query}`);
  };

  return (
    <main className="container mx-auto">
      <BackgroundGraphic variant="top-halfcircle" className="text-[#015aa4]" />

      <a
        href="#transfer-form"
        className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-white focus:p-4 focus:text-black"
      >
        Hopp til overføringsskjema
      </a>

      <Heading
        title="Overfør"
        className="mb-4 text-5xl font-bold text-seniorbankWhite"
      />

      <div className="flex w-full justify-center font-bold">
        <Card
          className="w-full max-w-[480px] bg-[#D3D3EA] px-5 pt-14"
          id="transfer-form"
        >
          <form onSubmit={handleSubmit} aria-labelledby="transfer-form-heading">
            <h2 id="transfer-form-heading" className="sr-only">
              Overføringsskjema
            </h2>

            <CardContent className="text-seniorBankDarkBlue">
              <div className="mb-3">
                <Label htmlFor="from-account" className="mb-1 block">
                  Fra konto:<span aria-hidden="true">*</span>
                  <span className="sr-only"> (påkrevd)</span>
                </Label>
                <Select
                  value={fromAccount}
                  onValueChange={setFromAccount}
                  name="from-account"
                >
                  <SelectTrigger
                    id="from-account"
                    aria-required="true"
                    aria-invalid={error && !fromAccount ? "true" : "false"}
                  >
                    <SelectValue placeholder="Velg konto" />
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

              <div className="mb-3">
                <Label htmlFor="to-account" className="mb-1 block">
                  Til konto:<span aria-hidden="true">*</span>
                  <span className="sr-only"> (påkrevd)</span>
                </Label>
                <Select
                  value={toAccount}
                  onValueChange={setToAccount}
                  name="to-account"
                >
                  <SelectTrigger
                    id="to-account"
                    aria-required="true"
                    aria-invalid={error && !toAccount ? "true" : "false"}
                  >
                    <SelectValue placeholder="Velg konto" />
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

              <div className="mb-3">
                <Label htmlFor="amount" className="mb-1 block">
                  Beløp:<span aria-hidden="true">*</span>
                  <span className="sr-only"> (påkrevd)</span>
                </Label>
                <div className="relative w-full">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9]"
                    aria-required="true"
                    aria-invalid={error && !amount ? "true" : "false"}
                    aria-describedby={error ? "error-message" : undefined}
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                  />
                  <Banknote
                    className="absolute right-3 top-0 size-8"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="mb-3">
                <Label htmlFor="comment" className="mb-1 block">
                  Kommentar:
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9] text-start"
                  aria-describedby="comment-hint"
                />
                <p
                  id="comment-hint"
                  className="sr-only mt-1 text-sm text-gray-600"
                >
                  Valgfri kommentar til overføringen
                </p>
              </div>

              {error && (
                <p
                  id="error-message"
                  className="mt-2 rounded border border-red-600 bg-red-50 p-2 font-medium text-red-600"
                  role="alert"
                  ref={errorRef}
                  tabIndex={-1}
                >
                  {error}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="w-1/2 bg-seniorBankDarkBlue text-xl text-seniorbankWhite"
                aria-label="Bekreft overføring"
              >
                Bekreft
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
