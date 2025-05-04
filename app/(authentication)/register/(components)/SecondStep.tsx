"use client";
import type { RegisterAccountFormData } from "@/lib/types";
import React from "react";

import { Button } from "@/ui/atoms/Button";
import { Input } from "@/ui/atoms/Input";
import { useState, useEffect } from "react";

interface Props {
  formData: RegisterAccountFormData;
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SecondStep = ({
  formData,
  handleChange,
  handleNextStep,
  email,
}: Props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    const newErrors = {
      firstName: formData.firstName ? "" : "Fornavn er påkrevd",
      lastName: formData.lastName ? "" : "Etternavn er påkrevd",
      birthDate: "",
      phoneNumber: "",
      address: formData.address ? "" : "Adresse er påkrevd",
    };

    if (!formData.birthDate) {
      newErrors.birthDate = "Fødselsdato er påkrevd";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (isNaN(birthDate.getTime())) {
        newErrors.birthDate = "Ugyldig fødselsdato";
      } else if (age < 18 || age > 120) {
        newErrors.birthDate = "Du må være mellom 18 og 120 år";
      }
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Telefonnummer er påkrevd";
    } else if (formData.phoneNumber.length !== 8) {
      newErrors.phoneNumber = "Telefonnummeret må bestå av 8 siffer";
    }

    setErrors(newErrors);

    const valid = Object.values(newErrors).every((error) => error === "");
    setIsFormValid(valid);
  }, [formData]);

  const handleSubmitWithValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (isFormValid) {
      handleNextStep(e);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h2 className="text-3xl font-bold text-seniorBankDarkBlue">
        Personopplysninger
      </h2>

      <form
        onSubmit={handleSubmitWithValidation}
        className="w-full space-y-6 md:px-32"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-lg font-bold text-seniorBankDarkBlue"
            >
              Fornavn
            </label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-seniorBankDarkBlue bg-white p-3 text-lg"
              name="firstName"
              required
              aria-invalid={attemptedSubmit && !!errors.firstName}
              aria-describedby={
                attemptedSubmit && errors.firstName
                  ? "firstName-error"
                  : undefined
              }
            />
            {attemptedSubmit && errors.firstName && (
              <p id="firstName-error" className="mt-1 text-red-600">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-lg font-bold text-seniorBankDarkBlue"
            >
              Etternavn
            </label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-seniorBankDarkBlue bg-white p-3 text-lg"
              name="lastName"
              required
              aria-invalid={attemptedSubmit && !!errors.lastName}
              aria-describedby={
                attemptedSubmit && errors.lastName
                  ? "lastName-error"
                  : undefined
              }
            />
            {attemptedSubmit && errors.lastName && (
              <p id="lastName-error" className="mt-1 text-red-600">
                {errors.lastName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="birthDate"
              className="block text-lg font-bold text-seniorBankDarkBlue"
            >
              Fødselsdato
            </label>
            <Input
              id="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              type="date"
              className="w-full rounded-lg border-2 border-seniorBankDarkBlue bg-white p-3 text-lg"
              name="birthDate"
              required
              aria-invalid={attemptedSubmit && !!errors.birthDate}
              aria-describedby={
                attemptedSubmit && errors.birthDate
                  ? "birthDate-error"
                  : undefined
              }
            />
            {attemptedSubmit && errors.birthDate && (
              <p id="birthDate-error" className="mt-1 text-red-600">
                {errors.birthDate}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-bold text-seniorBankDarkBlue"
            >
              Telefonnummer
            </label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              type="tel"
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-seniorBankDarkBlue bg-white p-3 text-lg"
              name="phoneNumber"
              required
              maxLength={8}
              pattern="[0-9]{8}"
              aria-invalid={attemptedSubmit && !!errors.phoneNumber}
              aria-describedby={
                attemptedSubmit && errors.phoneNumber
                  ? "phoneNumber-error"
                  : undefined
              }
            />
            {attemptedSubmit && errors.phoneNumber && (
              <p id="phoneNumber-error" className="mt-1 text-red-600">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-lg font-bold text-seniorBankDarkBlue"
            >
              Adresse
            </label>
            <Input
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-seniorBankDarkBlue bg-white p-3 text-lg"
              name="address"
              required
              aria-invalid={attemptedSubmit && !!errors.address}
              aria-describedby={
                attemptedSubmit && errors.address ? "address-error" : undefined
              }
            />
            {attemptedSubmit && errors.address && (
              <p id="address-error" className="mt-1 text-red-600">
                {errors.address}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-lg font-bold text-seniorBankDarkBlue"
            >
              Epost
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              className="w-full rounded-lg border-2 border-seniorBankDarkBlue bg-gray-100 p-3 text-lg"
              name="email"
              disabled
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full rounded-xl bg-seniorBankDarkBlue py-6 text-3xl font-medium text-white hover:bg-blue-800"
          >
            Neste steg
          </Button>
          {attemptedSubmit && !isFormValid && (
            <p className="mt-2 text-center text-red-600">
              Vennligst fyll ut alle feltene før du går videre
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
