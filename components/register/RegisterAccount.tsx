"use client";
import { ProgressBar } from "@/components/all/ProgressBar";
import FirstStep from "@/components/register/FirstStep";
import SecondStep from "@/components/register/SecondStep";
import ThirdStep from "@/components/register/ThirdStep";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import registerAccount from "@/lib/actions/registerAccount";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //TODO -> Midlertig console log

    e.preventDefault();

    await registerAccount(formData);

    toast.success("Brukeren er opprettet!");

    redirect("/");

    return false;
  };

  return (
    <main className="container mx-auto my-8">
      <header
        className={`mt-8 flex flex-row items-center gap-2 text-seniorBankDarkBlue`}
      >
        <button onClick={() => handlePreviousStep()}>
          <ChevronLeft
            className={`size-16 ${step === 1 ? "text-white" : "text-inherit"}`}
          />
        </button>

        <h2 className="py-4 text-4xl font-bold">
          {step === 1 ? "Opprett ny bruker" : "Fyll ut din informasjon"}
        </h2>
      </header>

      <div className="mt-16 flex flex-col items-center">
        <div
          className={`${
            step === 1 ? "bg-inherit" : "bg-[#D3D3EA]"
          } w-full max-w-2xl rounded-2xl p-4`}
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
