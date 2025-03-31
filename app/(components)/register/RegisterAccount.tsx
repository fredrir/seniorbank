"use client";

import { ProgressBar } from "@/components/organisms/ProgressBar";
import FirstStep from "@/app/(components)/register/FirstStep";
import SecondStep from "@/app/(components)/register/SecondStep";
import ThirdStep from "@/app/(components)/register/ThirdStep";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import registerAccount from "@/actions/registerAccount";
import type { Session } from "next-auth";
import { RegisterAccountFormData } from "@/lib/types";

const defaultFormData: RegisterAccountFormData = {
  firstName: "",
  lastName: "",
  birthDate: "",
  phoneNumber: "",
  address: "",
  difficulty: "EASY",
};

export default function RegisterAccountPage({ session }: { session: Session }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterAccountFormData>(defaultFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 2) {
      if (
        formData.firstName === "" ||
        formData.lastName === "" ||
        formData.birthDate === "" ||
        formData.phoneNumber === "" ||
        formData.address === ""
      ) {
        toast.error("Fyll ut alle feltene før du går videre");
        return;
      }
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step === 2) {
      setFormData({
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        address: "",
        difficulty: "EASY",
      });
    }

    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await registerAccount(formData);

    if (!response) {
      toast.error("Noe gikk galt. Prøv igjen senere.");
      return;
    } else {
      toast.success("Brukeren er opprettet!");
      window.location.reload();
    }
  };

  return (
    <main className="container mx-auto my-8">
      <header
        className={`mt-8 flex flex-row items-center gap-2 text-seniorBankDarkBlue`}
      >
        {step !== 1 && (
          <button onClick={() => handlePreviousStep()}>
            <ChevronLeft
              className={`size-16 ${step === 1 ? "text-white" : "text-inherit"}`}
            />
          </button>
        )}

        <h2 className="py-4 text-4xl font-bold">
          {step === 1 ? "Opprett ny bruker" : "Fyll ut din informasjon"}
        </h2>
      </header>

      <div className="mt-16 flex flex-col items-center">
        <div
          className={`${
            step !== 1 && "bg-[#D3D3EA]"
          } w-full max-w-2xl rounded-2xl p-4`}
        >
          <div className={`${step === 1 && "rounded-2xl bg-[#D3D3EA]"}`}>
            <ProgressBar totalSteps={3} currentStep={step} />
          </div>

          {step === 1 && (
            <FirstStep setFormData={setFormData} setStep={setStep} />
          )}

          {step === 2 && (
            <SecondStep
              formData={formData}
              email={session.email}
              handleChange={handleChange}
              handleNextStep={handleNextStep}
            />
          )}

          {step === 3 && <ThirdStep handleSubmit={handleSubmit} />}
        </div>
      </div>
    </main>
  );
}
