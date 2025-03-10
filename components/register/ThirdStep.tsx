import { Button } from "../ui/button";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ThirdStep = ({ handleSubmit }: Props) => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-seniorBankDarkBlue text-3xl font-bold">
        Godkjenn våre <a className="underline text-[#0000EE]" href="/asdf.txt">vilkår</a>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <Button
          type="submit"
          className="bg-seniorBankDarkBlue text-white w-full py-2 rounded"
        >
          Fullfør registrering
        </Button>
      </form>
    </div>
  );
};

export default ThirdStep;
