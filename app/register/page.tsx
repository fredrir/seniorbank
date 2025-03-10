"use client";
import { ProgressBar } from "@/components/all/ProgressBar";
import FirstStep from "@/components/register/FirstStep";
import SecondStep from "@/components/register/SecondStep";
import ThirdStep from "@/components/register/ThirdStep";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function RegisterAccountPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    email: "",
    difficulty: "",
  });

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
        formData.address === "" ||
        formData.email === ""
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
        email: "",
        difficulty: "",
      });
    }

    setStep(step - 1);
  };

  const handleSubmit = () => {
    //TODO -> Midlertig console log

    console.log(formData);

    toast.success("Brukeren er opprettet!");

    redirect("/");
  };

  return (
    <main className="mx-auto container my-8">
      <header
        className={`flex flex-row gap-2 mt-8 items-center text-seniorBankDarkBlue `}
      >
        <button onClick={() => handlePreviousStep()}>
          <ChevronLeft
            className={`size-16 ${step === 1 ? "text-white" : "text-inherit"}`}
          />
        </button>

        <h2 className="text-4xl py-4 font-bold">
          {step === 1 ? "Opprett ny bruker" : "Fyll ut din informasjon"}
        </h2>
      </header>

      <div className="flex flex-col items-center mt-16">
        <div
          className={`${
            step === 1 ? "bg-inherit" : "bg-[#D3D3EA]"
          } p-4 rounded-2xl w-full max-w-2xl`}
        >
          <ProgressBar totalSteps={3} currentStep={step} />

          {step === 1 && (
            <FirstStep setFormData={setFormData} setStep={setStep} />
          )}

          {step === 2 && (
            <SecondStep
              formData={formData}
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
