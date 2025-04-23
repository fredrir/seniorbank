"use client";

import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GraduationCap,
  Inbox,
} from "lucide-react";
import ApprovalCard from "./ApprovalCard";

// TODO mockdata
const initialApprovals = [
  {
    id: 1,
    icon: GraduationCap,
    recipient: "Mottager 1",
    amount: "699",
    message: "Evt melding fra bruker",
    iconBg: "#F8E9DD",
    date: new Date(),
    isSuspicious: false,
  },
  {
    id: 2,
    icon: GraduationCap,
    recipient: "Mottager 2",
    amount: "1299",
    message: "Betaling for kurs",
    iconBg: "#E9F8DD",
    date: new Date(),
    isSuspicious: false,
  },
  {
    id: 3,
    icon: GraduationCap,
    recipient: "Mottager 3",
    amount: "499",
    message: "Månedlig donasjon",
    iconBg: "#DDE9F8",
    date: new Date(),
    isSuspicious: true,
  },
];

export default function ApprovalSlider() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle case when there are no approvals
  if (approvals.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center p-4 pt-16">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center shadow-sm transition-all">
            <Inbox className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Ingenting å fjerne
            </h3>
            <p className="text-sm text-gray-500">
              Det er ingen elementer som venter på godkjenning for øyeblikket.
            </p>
          </div>
        </div>
      </div>
    );
  }

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

  // Handle rejection of an item
  const handleReject = () => {
    // Remove the current approval
    setApprovals((current) => current.filter((_, i) => i !== currentIndex));

    // Adjust the current index if needed
    if (currentIndex >= approvals.length - 1) {
      setCurrentIndex(Math.max(0, approvals.length - 2));
    }
  };

  // Handle approval of an item
  const handleApprove = () => {
    // Remove the current approval
    setApprovals((current) => current.filter((_, i) => i !== currentIndex));

    // Adjust the current index if needed
    if (currentIndex >= approvals.length - 1) {
      setCurrentIndex(Math.max(0, approvals.length - 2));
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 pt-16">
      <div className="w-full max-w-md">
        <h2 className="mb-4 text-center text-lg font-bold text-blue-900 md:text-xl">
          Venter på godkjenning:
        </h2>

        <ApprovalCard
          recipient={currentApproval.recipient}
          amount={currentApproval.amount}
          date={currentApproval.date}
          isSuspicious={currentApproval.isSuspicious}
          onReject={handleReject}
          onApprove={handleApprove}
          readMore
        />

        {approvals.length > 1 && (
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
        )}
      </div>
    </div>
  );
}
