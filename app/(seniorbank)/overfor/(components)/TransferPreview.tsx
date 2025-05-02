"use client";

import { ArrowDown, CheckCircle, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";
import { Card, CardHeader, CardContent, CardFooter } from "@/ui/atoms/Card";
import { Label } from "@/ui/atoms/Label";
import { Button } from "@/ui/atoms/Button";

interface TransferPreviewProps {
  fromAccount: JsonBankAccount;
  toAccount: JsonBankAccount;
  amount: number;
  handleCancel: () => void;
  handleConfirm: () => void;
}

export default function TransferPreview({
  amount,
  fromAccount,
  toAccount,
  handleCancel,
  handleConfirm,
}: TransferPreviewProps) {
  return (
    <Card className="w-full max-w-lg rounded-xl border-0 bg-gradient-to-b from-[#E8E8F5] to-[#D3D3EA] shadow-lg">
      <CardHeader className="space-y-2 pt-14">
        <h2 className="text-center text-2xl font-bold text-[#2D2D7E]">
          Bekreft overføring
        </h2>
        <div className="mx-auto flex items-center justify-center rounded-full bg-[#F2F2F9] px-2 py-4 shadow-inner">
          <p className="text-xl font-bold text-[#2D2D7E]">
            {formatCurrency(amount)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-8 text-[#2D2D7E]">
        <div className="space-y-2">
          <Label className="font-medium">Fra konto</Label>
          <div className="overflow-hidden rounded-lg border-2 border-[#2D2D7E]/20 bg-[#F2F2F9] p-3 shadow-sm">
            <p className="font-semibold">{fromAccount.name}</p>
            <p className="text-sm opacity-70">{fromAccount.id}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#2D2D7E] text-white">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Til konto</Label>
          <div className="overflow-hidden rounded-lg border-2 border-[#2D2D7E]/20 bg-[#F2F2F9] p-3 shadow-sm">
            <p className="font-semibold">{toAccount.name}</p>
            <p className="text-sm opacity-70">{toAccount.id}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-4 px-8 pb-8">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="flex w-1/2 gap-2 border-2 border-[#2D2D7E]/70 bg-white font-medium text-[#2D2D7E] hover:bg-[#2D2D7E]/10"
        >
          <XCircle className="h-4 w-4" />
          Avbryt
        </Button>
        <Button
          onClick={handleConfirm}
          className="flex w-1/2 gap-2 bg-[#2D2D7E] font-medium hover:bg-[#1F1F5A]"
        >
          <CheckCircle className="h-4 w-4" />
          Bekreft
        </Button>
      </CardFooter>
    </Card>
  );
}
