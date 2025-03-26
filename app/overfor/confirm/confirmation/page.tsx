import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Banknote, ChevronRight } from "lucide-react";

export default function Cornfirm() {

return (
	<section className="mx-auto container">
		<h1 className="text-5xl font-bold mt-16 mb-8 text-seniorBankDarkBlue">
			Overfør
		</h1>
		<div className="flex justify-center w-full">
		<Card className="bg-[#D3D3EA] w-[480px] pt-14 px-5 text-seniorBankDarkBlue items-center">
			<CardHeader className="font-bold text-center">
				<CardTitle className="text-4xl mb-3">Overføringen er gjennomført</CardTitle>
				<CardDescription className="text-seniorBankDarkBlue">Trygghetskontrakten er varslet</CardDescription>
			</CardHeader>
			<CardFooter className="flex justify-end">
				<div className="relative w-full">
				<Button className="bg-seniorBankDarkBlue text-seniorbankWhite font-bold w-full text-xl mt-5">
					<Link href="/">Tilbake til hovedsiden
					</Link>
					<ChevronRight className="absolute right-1 size-10"/>
				</Button>
				</div>
			</CardFooter>
		</Card>

		</div>
	</section>
);
}