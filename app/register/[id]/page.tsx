"use client";
import { ChevronLeft } from "lucide-react";
import { ProgressBar } from "@/components/all/ProgressBar";
import FirstStep from "@/components/register/FirstStep";
import { useState } from "react";

export default function RegisterAccountStepPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <main>
      <header className="flex flex-row gap-2 mt-8 items-center text-seniorBankDarkBlue">
        <button onClick={() => setStep(step - 1)}>
          <ChevronLeft className="size-16" />
        </button>

        <h2 className="text-4xl font-bold">Fyll ut din informasjon</h2>
      </header>

      <div className="flex flex-col items-center mt-16">
        <div className="bg-[#D3D3EA] p-4 rounded-2xl w-full max-w-2xl">
          <ProgressBar totalSteps={3} currentStep={step} />

          {step === 1 && (
            <FirstStep
              formData={formData}
              handleChange={handleChange}
              handleNextStep={handleNextStep}
            />
          )}
        </div>
      </div>
    </main>
  );
}
