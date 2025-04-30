"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/ui/atoms/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/atoms/Card";
import { SuccessToast } from "../../(components)/SuccessToast";

export default function Confirmation() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  return (
    <main className="container mx-auto">
      <SuccessToast aria-live="assertive" />

      <h1
        ref={headingRef}
        className="mb-8 mt-16 text-5xl font-bold text-seniorBankDarkBlue"
        tabIndex={-1}
      >
        Overføring fullført
      </h1>

      <div className="flex w-full justify-center">
        <Card className="w-full max-w-[480px] items-center bg-[#D3D3EA] px-5 pt-14 text-seniorBankDarkBlue">
          <CardHeader className="text-center font-bold">
            <CardTitle
              className="mb-3 text-4xl"
              role="status"
              aria-live="polite"
            >
              Overføringen er gjennomført
            </CardTitle>
            <CardDescription className="text-lg text-seniorBankDarkBlue">
              Trygghetskontrakten er varslet
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex w-full justify-end">
            <div className="relative w-full">
              <Button
                className="group mt-5 w-full bg-seniorBankDarkBlue text-xl font-bold text-seniorbankWhite"
                aria-label="Tilbake til hovedsiden"
              >
                <Link
                  href="/"
                  className="flex w-full items-center justify-between"
                >
                  <span>Tilbake til hovedsiden</span>
                  <ChevronRight
                    className="size-10 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
