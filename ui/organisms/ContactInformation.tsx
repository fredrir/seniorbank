export default function ContactInformation() {
  return (
    <section className="space-y-6 text-balance py-6 text-lg sm:text-xl">
      <h1 className="text-4xl font-bold text-seniorBankDarkBlue sm:text-6xl">
        Kontakt oss
      </h1>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold sm:text-4xl">Utsatt for svindel?</h2>
        <p>
          Kontakt banken umiddelbart på <strong>915 05700</strong> for hjelp.
        </p>
        <h2 className="text-2xl font-bold sm:text-4xl">Kontakt banken</h2>
        <p>
          Kontakt vår kundehjelp om du trenger hjelp eller er usikker på bankID,
          mobilbank og nettbank, kort og mer.
        </p>
        <ul className="space-y-2">
          <li>
            Privat: <strong>915 05700</strong>
          </li>
          <li>
            Fra utland: <strong>(+47) 915 05700</strong>
          </li>
          <li>
            Åpningstider: <strong>7-22 (10-18)</strong>
          </li>
        </ul>

        <h2 className="text-2xl font-bold sm:text-4xl">
          Kontakt trygghetskontakt
        </h2>
        <p>
          Kontakt trygghetskontakt om du trenger hjelp eller er usikker på
          transaksjoner i nettbanken, betalinger eller andre banktjenester.
        </p>
        <p>
          Ring trygghetskontakten på <strong>xxxxxxxx</strong>
        </p>

        <h2 className="text-2xl font-bold sm:text-4xl">Politiet</h2>
        <p>
          Ring sentralbordet <strong>02800</strong> når du trenger å kontakte
          politiet om tjenester eller annet, som ikke er en nødsituasjon.
        </p>
      </div>
    </section>
  );
}
