import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Banknote } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Cornfirm() {

return (
	<section className="mx-auto container">
		<h1 className="text-5xl font-bold mt-16 mb-8 text-seniorBankDarkBlue">
			Overfør
		</h1>
		<div className="flex justify-center w-full">
		<Card className="bg-[#D3D3EA] w-[480px] pt-14 px-5 font-bold">
			<CardHeader className="flex flex-row justify-between d">
				<CardDescription className="text-seniorBankDarkBlue">Du er i ferd med å overføre</CardDescription>
				<CardDescription className="text-seniorBankDarkBlue">1000 kr</CardDescription>
			</CardHeader>
			<CardContent className="text-seniorBankDarkBlue">
				<Label>fra konto</Label>
				<Input value="Brukskonto - 18 932,54 kr" readOnly className="mx-5 mb-5 "/>

				<Label>til konto</Label>
				<Input value="Sparekonto - 829 182,92 kr" readOnly className="mx-5 mb-5"/>

			</CardContent>
			<CardFooter className="flex justify-between">
				<Button asChild className="bg-[#EC7B7C] text-seniorbankWhite border border-seniorBankDarkBlue w-1/3 text-xl font-bold">
					<Link href="/transfer">Avbryt
					</Link>
				</Button>
				<Button asChild className="bg-seniorBankDarkBlue text-seniorbankWhite w-1/2 text-xl font-bold">
					<Link href="/transfer/confirm/confirmation">Bekreft
					</Link>
				</Button>
			</CardFooter>
		</Card>

		</div>
	</section>
);
}