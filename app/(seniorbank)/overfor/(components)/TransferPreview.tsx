import { Button } from "@/ui/atoms/Button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/ui/atoms/Card";
import { Input } from "@/ui/atoms/Input";
import { Label } from "@radix-ui/react-label";
import { formatCurrency } from "@/lib/utils";
import { JsonBankAccount } from "@/model/application/mappers/JsonBankAccountDTOMapper";

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
    <Card className="w-[480px] bg-[#D3D3EA] px-5 pt-14 font-bold">
      <CardHeader className="flex flex-row justify-between">
        <CardDescription className="text-seniorBankDarkBlue">
          Du er i ferd med å overføre
        </CardDescription>
        <CardDescription className="text-seniorBankDarkBlue">
          {formatCurrency(amount)} kr
        </CardDescription>
      </CardHeader>
      <CardContent className="text-seniorBankDarkBlue">
        <Label>fra konto</Label>
        <Input
          value={`${fromAccount.name} - ${fromAccount.id}`}
          readOnly
          className="mb-5 rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9]"
        />

        <Label>til konto</Label>
        <Input
          value={`${toAccount.name} - ${toAccount.id}`}
          readOnly
          className="mb-5 rounded-sm border-seniorBankDarkBlue bg-[#F2F2F9]"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handleCancel}
          variant={"destructive"}
          size={"lg"}
          className="border border-seniorBankDarkBlue"
        >
          Avbryt
        </Button>
        <Button onClick={handleConfirm} size={"lg"} className="ml-20 w-full">
          Bekreft
        </Button>
      </CardFooter>
    </Card>
  );
}
