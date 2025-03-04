import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Home() {
return (
	<section className="mx-auto container">
		<h1 className="text-5xl font-bold mt-16 mb-8 text-seniorBankDarkBlue">
			Overfør
		</h1>
		<div className="flex justify-center w-full">
		<Card className="bg-[#D3D3EA] w-[480px] pt-14 px-5">
			<CardContent className="text-seniorBankDarkBlue">
				<Label>Fra konto:</Label>
				<Select>
					<SelectTrigger>
						<SelectValue/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="konto1">Konto 1</SelectItem>
						<SelectItem value="konto2">Konto 2</SelectItem>
						<SelectItem value="konto3">Konto 3</SelectItem>
					</SelectContent>
				</Select>

				<Label>Til konto:</Label>
				<Select>
					<SelectTrigger>
						<SelectValue/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="konto1">Konto 1</SelectItem>
						<SelectItem value="konto2">Konto 2</SelectItem>
						<SelectItem value="konto3">Konto 3</SelectItem>
					</SelectContent>
				</Select>

				<Label>Antall:</Label>
				<Textarea/>

				<Label>Kommentar:</Label>
				<Textarea className="h-32"/>
			</CardContent>
			<CardFooter>
				<Button className="bg-seniorBankDarkBlue text-seniorbankWhite font-bold">Bekreft</Button>
			</CardFooter>
		</Card>

		</div>
	</section>
);
}