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


export default function Transfer() {

return (
	<section className="mx-auto container">
		<h1 className="text-5xl font-bold mt-16 mb-8 text-seniorBankDarkBlue">
			Overfør
		</h1>
		<div className="flex justify-center w-full">
		<Card className="bg-[#D3D3EA] w-[480px] pt-14 px-5">
			<CardContent className="text-seniorBankDarkBlue">
				<Label>Fra konto:</Label>
				<div className="mb-3">
					<Select>
						<SelectTrigger>
							<SelectValue/>
						</SelectTrigger>
						<SelectContent >
							<SelectItem value="konto1">Brukskonto - 18 932,54 kr</SelectItem>
							<SelectItem value="konto2">Sparekonto - 829 182,92 kr</SelectItem>
							<SelectItem value="konto3">Barnebarn  - 34 835 kr</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Label>Til konto:</Label>
				<div className="mb-3">
					<Select>
						<SelectTrigger>
							<SelectValue/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="konto1">Brukskonto - 18 932,54 kr</SelectItem>
							<SelectItem value="konto2">Sparekonto - 829 182,92 kr</SelectItem>
							<SelectItem value="konto3">Barnebarn  - 34 835 kr</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Label>Antall:</Label>
				<div className="relative w-full">
					<Input className="mb-3"/>
					<Banknote className="absolute right-3 top-0 font-bold size-8"/>
				</div>

				<Label>Kommentar:</Label>
				<Input className="h-32 mb-3"/>
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button asChild className="bg-seniorBankDarkBlue text-seniorbankWhite font-bold w-1/2 text-xl">
						<Link href="/transfer/confirm">Bekreft
						</Link>
					</Button>
				</CardFooter>
			</Card>

		</div>
	</section>
);
}