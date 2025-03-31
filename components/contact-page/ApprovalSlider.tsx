import { ArrowLeftIcon, ArrowRightIcon, GraduationCap } from "lucide-react";

export default function ApprovalSlider() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 pt-16">
      <div className="w-full max-w-md">
        <h2 className="mb-4 text-center text-lg font-bold text-blue-900 md:text-xl">
          Venter på godkjenning:
        </h2>

        <div className="rounded-xl bg-[#F2F2F9] p-5 shadow-sm">
          <div className="mb-1 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-[#F8E9DD] p-1.5">
                <GraduationCap className="h-5 w-5 text-gray-700" />
              </div>
              <span className="text-lg font-medium text-blue-900 underline">
                Mottager
              </span>
            </div>
            <span className="font-medium text-blue-900">699 kr</span>
          </div>

          <p className="mb-4 text-sm text-gray-500">Evt melding fra bruker</p>

          <div className="mb-1 flex gap-3 text-lg">
            <button className="flex-1 rounded-2xl border-2 border-blue-900 text-blue-900 hover:bg-blue-50 hover:text-blue-900">
              Avvis
            </button>
            <button className="flex-1 rounded-2xl bg-blue-900 text-white hover:bg-blue-800">
              Godkjenn
            </button>
          </div>

          <div className="text-right">
            <button className="text-sm text-blue-900 underline">Se mer</button>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="text-blue-900">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <button className="text-blue-900">
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
