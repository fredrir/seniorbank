"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import Heading from "../(components)/Heading";
import ApprovalCard from "../(components)/ApprovalCard";

// Initial data
const initialToBeApproved = [
  {
    recipient: "Mottager",
    amount: "699",
    date: new Date(),
    isSuspicious: false,
  },
  {
    recipient: "Sus mottaker",
    amount: "15 999",
    date: new Date(),
    isSuspicious: true,
  },
];

export default function ContactPersonConfirmationPage() {
  const [toBeApproved, setToBeApproved] = useState(initialToBeApproved);

  // Handle rejection of an item
  const handleReject = (index: number) => {
    setToBeApproved((current) => current.filter((_, i) => i !== index));
  };

  // Handle approval of an item
  const handleApprove = (index: number) => {
    setToBeApproved((current) => current.filter((_, i) => i !== index));
  };

  return (
    <main>
      <Heading title="Bekreft" href="/kontakt" className="pt-8" />

      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col gap-8 p-4">
        {toBeApproved.length <= 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center shadow-sm transition-all">
            <Inbox className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Ingenting å gjøre
            </h3>
            <p className="text-sm text-gray-500">
              Det er ingen elementer som venter på godkjenning for øyeblikket.
            </p>
          </div>
        ) : (
          toBeApproved.map((item, index) => (
            <ApprovalCard
              key={index}
              recipient={item.recipient}
              amount={item.amount}
              date={item.date}
              isSuspicious={item.isSuspicious}
              onReject={() => handleReject(index)}
              onApprove={() => handleApprove(index)}
              isAdvanced
            />
          ))
        )}
      </div>
    </main>
  );
}
