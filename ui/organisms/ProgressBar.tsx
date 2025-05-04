import { Check } from "lucide-react";

interface Props {
  totalSteps: number;
  currentStep: number;
  title?: string;
}

export function ProgressBar({ totalSteps, currentStep, title }: Props) {
  return (
    <div className="w-full rounded-lg bg-inherit p-8">
      <div className="mb-6 flex items-center justify-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex size-12 items-center justify-center rounded-full text-4xl font-medium md:size-20 ${
                index < currentStep - 1
                  ? "bg-[#70c7aa] text-4xl text-black"
                  : index === currentStep - 1
                    ? "border-2 border-[#70c7aa] bg-[#C2E7DA] text-4xl text-gray-600"
                    : "border-2 border-seniorBankLightPurple bg-white text-[#707070]"
              } `}
            >
              {index < currentStep - 1 ? (
                <Check className="size-12 text-gray-600" />
              ) : (
                index + 1
              )}
            </div>

            {index < totalSteps - 1 && (
              <div
                className={`mx-8 h-1 w-16 md:w-24 ${index < currentStep - 1 ? "bg-[#70c7aa]" : "bg-seniorBankLightBlue"}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {title && (
        <div className="text-center text-lg font-medium text-[#002776]">
          {title}
        </div>
      )}
    </div>
  );
}
