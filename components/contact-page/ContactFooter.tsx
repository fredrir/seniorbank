import Link from "next/link";

export default function ContactFooter() {
  return (
    <footer className="w-full">
      <div className="relative h-32 w-full overflow-hidden bg-[#f8eadb]">
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fillOpacity='1' d='M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0a3380]">Eldrebanken</h2>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold text-[#0a3380]">Kontakt</h3>
              <p className="mb-2">
                Tlf:{" "}
                <Link href="tel:98474234" className="hover:underline">
                  984 74 234
                </Link>
              </p>
              <p className="mb-2">
                Epost:{" "}
                <Link
                  href="mailto:kontakt@eldrebanken.no"
                  className="hover:underline"
                >
                  kontakt@eldrebanken.no
                </Link>
              </p>
              <Link href="#" className="text-[#0a3380] hover:underline">
                Kontaktskjema her
              </Link>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-[#0a3380]">
                Snarveier
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-[#0a3380] hover:underline">
                    Hjem
                  </Link>
                </li>
                <li>
                  <Link
                    href="/betaling"
                    className="text-[#0a3380] hover:underline"
                  >
                    Betaling
                  </Link>
                </li>
                <li>
                  <Link
                    href="/konto"
                    className="text-[#0a3380] hover:underline"
                  >
                    Konto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-[#0a3380]">Om oss</h3>
              <p className="mb-2">
                Vi gjør nettbank enkelt, trygt og tilpasset dine behov. 💙
              </p>
              <p>
                Velg det nivået som passer deg, og få ekstra sikkerhet med en
                trygghetskontakt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
