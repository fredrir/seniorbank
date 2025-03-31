"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, GraduationCap } from "lucide-react";

// TODO mockdata
const approvals = [
  {
    id: 1,
    icon: GraduationCap,
    recipient: "Mottager 1",
    amount: "699 kr",
    message: "Evt melding fra bruker",
    iconBg: "#F8E9DD",
  },
  {
    id: 2,
    icon: GraduationCap,
    recipient: "Mottager 2",
    amount: "1299 kr",
    message: "Betaling for kurs",
    iconBg: "#E9F8DD",
  },
  {
    id: 3,
    icon: GraduationCap,
    recipient: "Mottager 3",
    amount: "499 kr",
    message: "Månedlig donasjon",
    iconBg: "#DDE9F8",
  },
];

export default function ApprovalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentApproval = approvals[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? approvals.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === approvals.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 pt-16">
      <div className="w-full max-w-md">
        <h2 className="mb-4 text-center text-lg font-bold text-blue-900 md:text-xl">
          Venter på godkjenning:
        </h2>

        <div className="rounded-xl bg-[#F2F2F9] p-5 shadow-sm">
          <div className="mb-1 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className="rounded-md"
                style={{
                  backgroundColor: currentApproval.iconBg,
                  padding: "0.375rem",
                }}
              >
                <currentApproval.icon className="h-5 w-5 text-gray-700" />
              </div>
              <span className="text-lg font-medium text-blue-900 underline">
                {currentApproval.recipient}
              </span>
            </div>
            <span className="font-medium text-blue-900">
              {currentApproval.amount}
            </span>
          </div>

          <p className="mb-4 text-sm text-gray-500">
            {currentApproval.message}
          </p>

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
          <button
            className="text-blue-900 transition-colors hover:text-blue-700"
            onClick={goToPrevious}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div className="flex gap-1">
            {approvals.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-blue-900" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <button
            className="text-blue-900 transition-colors hover:text-blue-700"
            onClick={goToNext}
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
