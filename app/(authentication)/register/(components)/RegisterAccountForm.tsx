"use client";

import React from "react";
import { ProgressBar } from "@/ui/organisms/ProgressBar";
import FirstStep from "@/app/(authentication)/register/(components)/FirstStep";
import SecondStep from "@/app/(authentication)/register/(components)/SecondStep";
import ThirdStep from "@/app/(authentication)/register/(components)/ThirdStep";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { register } from "@/actions/user";
import type { Session } from "next-auth";
import type { RegisterAccountFormData } from "@/lib/types";
import { redirect } from "next/navigation";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";
import { LogoutButton } from "@/ui/molecules/LogoutButton";
import FourthStep from "@/app/(authentication)/register/(components)/FourthStep";

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
  const [termsAccepted, setTermsAccepted] = useState(false);

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
        toast.error("Vennligst fyll ut alle feltene før du går videre");
        return;
      }

      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (isNaN(birthDate.getTime())) {
        toast.error("Ugyldig fødselsdato");
        return;
      }

      if (age < 18 || age > 120) {
        toast.error("Ugyldig alder. Du må være mellom 18 og 120 år.");
        return;
      }

      if (formData.phoneNumber.length !== 8) {
        toast.error("Telefonnummeret må bestå av 8 siffer");
        return;
      }
    }

    if (step === 3) {
      if (!termsAccepted) {
        toast.error(
          "Du må godkjenne vilkårene før du kan fullføre registreringen",
        );
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (step === 2) {
      setFormData({
        ...formData,
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        address: "",
      });
    }
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = await register(formData);

    if (error) {
      toast.error(error.toString());
      return;
    }

    toast.success("Brukeren er opprettet!");
    redirect("/");
  };

  return (
    <>
      <BackgroundGraphic
        variant="mid-wave"
        className="top-36 h-[150vh] scale-x-[-1] text-seniorbankBlue"
      />
      <header className="mt-8 flex w-full flex-row justify-between gap-2 text-seniorBankDarkBlue">
        {step !== 1 && (
          <div>
            <button
              onClick={handlePreviousStep}
              className="flex items-center gap-2 rounded-lg bg-seniorBankDarkBlue px-4 py-2 text-white hover:bg-blue-800"
              aria-label="Gå tilbake"
            >
              <ArrowLeft className="size-6" />
              <span className="text-2xl font-medium">Tilbake</span>
            </button>
          </div>
        )}
        <h2 className="py-4 text-4xl font-bold">
          {step === 1 ? "Opprett ny bruker" : "Fyll ut din informasjon"}
        </h2>
        <div>
          <LogoutButton title="Avbryt" />
        </div>
      </header>
      <div className="mt-16 flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg">
        {step !== 1 && <ProgressBar totalSteps={4} currentStep={step} />}
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
        {step === 3 && (
          <ThirdStep
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 4 && (
          <FourthStep
            formData={formData}
            email={session.email}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
}
