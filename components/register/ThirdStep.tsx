import { Button } from "../ui/button";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ThirdStep = ({ handleSubmit }: Props) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-seniorBankDarkBlue">
        Godkjenn våre{" "}
        <a className="text-[#0000EE] underline" href="/asdf.txt">
          vilkår
        </a>
      </h1>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <Button
          type="submit"
          className="w-full rounded bg-seniorBankDarkBlue py-2 text-white"
        >
          Fullfør registrering
        </Button>
      </form>
    </div>
  );
};

export default ThirdStep;
