import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
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
				<Input value="Brukskonto - 18 932,54 kr" readOnly className="mb-5 border-seniorBankDarkBlue bg-[#F2F2F9] rounded-sm"/>

				<Label>til konto</Label>
				<Input value="Sparekonto - 829 182,92 kr" readOnly className="mb-5 border-seniorBankDarkBlue bg-[#F2F2F9] rounded-sm"/>

			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant={"destructive"} size={"lg"} className="border border-seniorBankDarkBlue">
					<Link href="/overfor">Avbryt
					</Link>
				</Button>
				<Button size={"lg"} className="w-full ml-20">
					<Link href="/overfor/confirm/confirmation">Bekreft
					</Link>
				</Button>
			</CardFooter>
		</Card>

		</div>
	</section>
);
}