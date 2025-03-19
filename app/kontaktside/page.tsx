import HeaderText from "@/components/all/HeaderText";
import SubHeaderText from "@/components/all/SubHeaderText";
import { BackgroundGraphic } from "@/components/ui/BackgroundGraphic";

export default function SupportPage() {
  return (
    <section className="text-2xl">
      <BackgroundGraphic variant="inverse-topwave" className="text-[#015aa4]" />
      <HeaderText title="Kontakt oss" className="" />
      <h2 className="text-4xl font-bold">Utsatt for svindel?</h2>
      <p>Kontakt banken umiddelbart på 915 05700 for hjelp.</p>
      <h2 className="text-4xl font-bold">Ring banken</h2>
      <p>Ring oss</p>
      <p>
        Kontakt vår kundehjelp om du trenger hjelp eller er usikker på bankID,
        mobilbank og nettbank, kort og mer.
      </p>
      <p>Privat: 05700</p>
      <p>Ring fra utland (+47)91505700</p>
      <p>7-22 (10-18)</p>
      <h2 className="text-4xl font-bold">Kontakt trygghetskontakt</h2>
      <p>Ring oss</p>
      <p>xxxxxxxx</p>

      <h2 className="text-4xl font-bold">Ring politiet</h2>
      <p>
        Ring sentralbordet 02800 når du trenger å kontakte politiet om tjenester
        eller annet, som ikke er en nødsituasjon.
      </p>
      <p>
        Banken eller polititet vil aldri be deg om å overføre penger til en
        annen konto.{" "}
      </p>
    </section>
  );
}
