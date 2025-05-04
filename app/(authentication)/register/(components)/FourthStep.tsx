"use client";

import React from "react";
import { Button } from "@/ui/atoms/Button";
import type { RegisterAccountFormData } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface Props {
  formData: RegisterAccountFormData;
  email: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const FourthStep = ({ formData, email, handleSubmit, isSubmitting }: Props) => {
  const difficultyText = {
    EASY: "Basisnivå",
    MEDIUM: "Moderert kontroll",
    HARD: "Full frihet",
  }[formData.difficulty];

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-seniorBankDarkBlue">
        Bekreft din informasjon
      </h1>

      <div className="w-full rounded-lg border-2 border-seniorBankDarkBlue bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-seniorBankDarkBlue">
          Kontaktinformasjon
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Fornavn</p>
            <p className="text-lg font-semibold text-seniorBankDarkBlue">
              {formData.firstName}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Etternavn</p>
            <p className="text-lg font-semibold text-seniorBankDarkBlue">
              {formData.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Fødselsdato</p>
            <p className="text-lg font-semibold text-seniorBankDarkBlue">
              {formData.birthDate}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Telefonnummer</p>
            <p className="text-lg font-semibold text-seniorBankDarkBlue">
              {formData.phoneNumber}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Adresse</p>
            <p className="text-lg font-semibold text-seniorBankDarkBlue">
              {formData.address}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">E-post</p>
            <p className="text-lg font-semibold text-seniorBankDarkBlue">
              {email}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500">Valgt nivå</p>
          <p className="text-lg font-semibold text-seniorBankDarkBlue">
            {difficultyText}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <Button
          type="submit"
          className="w-full rounded-xl bg-seniorBankDarkBlue py-6 text-3xl font-medium text-white hover:bg-blue-800 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-6 animate-spin" />
              Registrerer...
            </span>
          ) : (
            "Fullfør registrering"
          )}
        </Button>
      </form>
    </div>
  );
};

export default FourthStep;
