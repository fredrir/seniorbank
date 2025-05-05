import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-seniorbankBlue p-10 pt-24 text-center text-white">
      <div className="mx-auto max-w-5xl">
        {/* Overall Header */}
        <div className="mb-10 text-left">
          <h1 className="text-4xl font-bold">Seniorbanken</h1>
        </div>

        <div className="flex flex-col gap-10 text-left md:flex-row md:justify-center md:gap-40">
          {/* Kontakt Column */}
          <div>
            <h4 className="mb-5 text-lg font-bold">Kontakt</h4>
            <ul className="space-y-2">
              <li>Email: kontakt@seniorbank.no</li>
              <li>Telefon: +47 918 45 265</li>
              <li>Adresse: Bankveien 1, 0092 Oslo</li>
            </ul>
          </div>

          {/* Snarveier Column */}
          <div>
            <h4 className="mb-5 text-lg font-bold">Snarveier</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:underline">
                  Hjem
                </Link>
              </li>
              <li>
                <Link href="/betal" className="text-white hover:underline">
                  Betaling
                </Link>
              </li>
              <li>
                <Link href="/konto" className="text-white hover:underline">
                  Konto
                </Link>
              </li>
            </ul>
          </div>

          {/* Om Oss Column */}
          <div>
            <h4 className="mb-5 text-lg font-bold">Diverse</h4>
            <ul className="space-y-2">
              <li>
                <a href="/kontaktside" className="text-white hover:underline">
                  Spør om hjelp
                </a>
              </li>
              <li>
                <a href="/meldinger" className="text-white hover:underline">
                  Meldinger
                </a>
              </li>
              <li>
                <a href="/innstillinger" className="text-white hover:underline">
                  Innstillinger
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
