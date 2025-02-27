import { Check } from "lucide-react";

interface Props {
  totalSteps: number;
  currentStep: number;
  title?: string;
}

export function ProgressBar({ totalSteps, currentStep, title }: Props) {
  return (
    <div className="w-full bg-[#d3d3ea] p-8 rounded-lg">
      <div className="flex justify-center items-center mb-6">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-full text-4xl font-medium
                ${
                  index < currentStep - 1
                    ? "bg-[#70c7aa] text-black text-4xl"
                    : index === currentStep - 1
                    ? "bg-[#C2E7DA] border-[#70c7aa] border-2 text-gray-600 text-4xl"
                    : "bg-white text-[#707070]"
                }
              `}
            >
              {index < currentStep - 1 ? (
                <Check className="size-12 text-gray-600" />
              ) : (
                index + 1
              )}
            </div>

            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-16 md:w-24 mx-8 
                  ${index < currentStep - 1 ? "bg-[#70c7aa]" : "bg-white"}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {title && (
        <div className="text-center text-[#002776] text-lg font-medium">
          {title}
        </div>
      )}
    </div>
  );
}
