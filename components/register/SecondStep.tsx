"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  formData: {
    firstName: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    address: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SecondStep = ({ formData, handleChange, handleNextStep }: Props) => {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <h2 className="text-seniorBankDarkBlue text-3xl font-bold">
        Personopplysninger
      </h2>

      <form onSubmit={handleNextStep} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-[#002776] font-bold text-lg"
            >
              Fornavn
            </label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-[#005aa4] rounded p-2"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-[#002776] font-bold text-lg"
            >
              Etternavn
            </label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-[#005aa4] rounded p-2"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="birthDate"
              className="block text-[#002776] font-bold text-lg"
            >
              Fødselsdato
            </label>
            <Input
              id="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              type="date"
              className="w-full border border-[#005aa4] rounded p-2"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-[#002776] font-bold text-lg"
            >
              Telefonnummer
            </label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              type="number"
              onChange={handleChange}
              className="w-full border border-[#005aa4] rounded p-2"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-[#002776] font-bold text-lg"
            >
              Adresse
            </label>
            <Input
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-[#005aa4] rounded p-2"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-[#002776] font-bold text-lg"
            >
              Epost
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-[#005aa4] rounded p-2"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full text-3xl rounded-xl bg-[#002776] hover:bg-[#001d5e] text-white font-medium py-4 "
          >
            Neste steg
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
