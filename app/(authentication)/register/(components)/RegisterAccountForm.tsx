"use client";

import { ProgressBar } from "@/ui/organisms/ProgressBar";
import FirstStep from "@/app/(authentication)/register/(components)/FirstStep";
import SecondStep from "@/app/(authentication)/register/(components)/SecondStep";
import ThirdStep from "@/app/(authentication)/register/(components)/ThirdStep";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { register } from "@/actions/user";
import type { Session } from "next-auth";
import { RegisterAccountFormData } from "@/lib/types";
import { redirect } from "next/navigation";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";
import { LogoutButton } from "@/ui/molecules/LogoutButton";

const defaultFormData: RegisterAccountFormData = {
  firstName: "",
  lastName: "",
  birthDate: "",
  phoneNumber: "",
  address: "",
  difficulty: "EASY",
};

export default function RegisterAccountForm({ session }: { session: Session }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] =
    useState<RegisterAccountFormData>(defaultFormData);

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

    const error = await register(formData);

    if (error) {
      toast.error(error.toString());
      return;
    } else {
      toast.success("Brukeren er opprettet!");
      redirect("/");
    }
  };

  return (
    <>
      <BackgroundGraphic
        variant="mid-wave"
        className="top-36 h-[150vh] scale-x-[-1] text-seniorbankBlue"
      />
      <header
        className={`mt-8 flex w-full flex-row justify-between gap-2 text-seniorBankDarkBlue`}
      >
        {step !== 1 && (
          <button onClick={() => handlePreviousStep()}>
            <ChevronLeft className={"size-16"} />
          </button>
        )}

        <h2 className="py-4 text-4xl font-bold">
          {step === 1 ? "Opprett ny bruker" : "Fyll ut din informasjon"}
        </h2>

        <div>
          <LogoutButton />
        </div>
      </header>

      <div className="mt-16 flex flex-col items-center rounded-2xl bg-seniorBankLightPurple p-8 shadow-lg">
        {step !== 1 && <ProgressBar totalSteps={3} currentStep={step} />}

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
    </>
  );
}
