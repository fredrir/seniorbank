"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { TermsModal } from "./TermsModal";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ThirdStep = ({ handleSubmit }: Props) => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const openTermsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-seniorBankDarkBlue">
        Godkjenn våre{" "}
        <button
          onClick={openTermsModal}
          className="cursor-pointer text-[#0000EE] underline"
        >
          vilkår
        </button>
      </h1>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <Button
          type="submit"
          className="w-full rounded bg-seniorBankDarkBlue py-2 text-white"
        >
          Fullfør registrering
        </Button>
      </form>

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};

export default ThirdStep;
