"use client";

import { useState } from "react";
import { Button } from "@/ui/atoms/Button";
import { Input } from "@/ui/atoms/Input";
import { Label } from "@radix-ui/react-label";
import { Banknote } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/ui/atoms/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/atoms/Select";
import { Textarea } from "@/ui/atoms/Textarea";
import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import { formatCurrency } from "@/lib/utils";

export type TransferFormData = {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
};

export default function TransferForm({
  accounts,
  onSubmit,
}: {
  accounts: JsonBankAccount[];
  onSubmit: (data: TransferFormData) => void;
}) {
  const [fromAccountId, setFromAccount] = useState(accounts[0].id);
  const [toAccountId, setToAccount] = useState(accounts[1].id);
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fromAccountId || !toAccountId || !amount) {
      setError("Vennligst fyll inn alle obligatoriske felt.");
      return;
    }
    setError("");

    if (fromAccountId === toAccountId) {
      setError("Du kan ikke overføre penger til samme konto.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Beløpet må være større enn 0.");
      return;
    }

    const fromAccount = accounts.find(
      (account) => account.id === fromAccountId,
    )!;

    if (Number(amount) > fromAccount.balance) {
      setError("Du har ikke nok penger på kontoen.");
      return;
    }
  };

  return (
    <Card className="w-[480px] bg-[#D3D3EA] px-5 pt-14">
      <form onSubmit={handleSubmit}>
        <CardContent className="text-seniorBankDarkBlue">
          <Label>Fra konto:</Label>
          <div className="mb-3">
            <Select value={fromAccountId} onValueChange={setFromAccount}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem value={account.id} key={account.id}>
                    {account.name} - {formatCurrency(account.balance)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Label>Til konto:</Label>
          <div className="mb-3">
            <Select value={toAccountId} onValueChange={setToAccount}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem value={account.id} key={account.id}>
                    {account.name} - {formatCurrency(account.balance)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Label>Beløp:</Label>
          <div className="relative w-full">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mb-3 rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9]"
            />
            <Banknote className="absolute right-3 top-0 size-8" />
          </div>

          <Label>Kommentar:</Label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-3 rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9] text-start"
          />
          {error && <p className="mt-2 font-medium text-red-600">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="w-1/2 bg-seniorBankDarkBlue text-xl text-seniorbankWhite"
            onClick={() => {
              onSubmit({
                amount: Number(amount),
                fromAccountId,
                toAccountId,
              });
            }}
          >
            Bekreft
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
