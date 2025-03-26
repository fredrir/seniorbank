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
  };
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SecondStep = ({ formData, handleChange, handleNextStep, email }: Props) => {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h2 className="text-3xl font-bold text-seniorBankDarkBlue">
        Personopplysninger
      </h2>

      <form onSubmit={handleNextStep} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-lg font-bold text-[#002776]"
            >
              Fornavn
            </label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded border border-[#005aa4] p-2"
              name="firstName"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-lg font-bold text-[#002776]"
            >
              Etternavn
            </label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded border border-[#005aa4] p-2"
              name="lastName"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="birthDate"
              className="block text-lg font-bold text-[#002776]"
            >
              Fødselsdato
            </label>
            <Input
              id="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              type="date"
              className="w-full rounded border border-[#005aa4] p-2"
              name="birthDate"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-bold text-[#002776]"
            >
              Telefonnummer
            </label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              type="number"
              onChange={handleChange}
              className="w-full rounded border border-[#005aa4] p-2"
              name="phoneNumber"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-lg font-bold text-[#002776]"
            >
              Adresse
            </label>
            <Input
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded border border-[#005aa4] p-2"
              name="address"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-lg font-bold text-[#002776]"
            >
              Epost
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              className="w-full rounded border border-[#005aa4] p-2"
              name="email"
              disabled
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full rounded-xl bg-[#002776] py-4 text-3xl font-medium text-white hover:bg-[#001d5e]"
          >
            Neste steg
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
