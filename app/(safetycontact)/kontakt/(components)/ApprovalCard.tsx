"use client";

import { AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  recipient: string;
  amount: number;
  category: string | null;
  date?: Date;
  accountName: string;
  isSuspicious?: boolean;
  onReject: () => void;
  onApprove: () => void;
  isAdvanced?: boolean;
  readMore?: boolean;
}

const ApprovalCard = ({
  recipient,
  category,
  amount,
  accountName,
  isSuspicious = false,
  onReject,
  onApprove,
}: Props) => {
  const handleReject = () => {
    toast.error(`Betaling til ${recipient} på ${amount} kr er avvist.`, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#F2F2F9",
        color: "#1C1B1F",
        fontSize: "16px",
        fontWeight: "500",
      },
    });
    onReject();
  };

  const handleApprove = () => {
    toast.success(`Betaling til ${recipient} på ${amount} kr er godkjent.`, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#002776",
        color: "#FFFFFF",
        fontSize: "16px",
        fontWeight: "500",
      },
    });
    onApprove();
  };

  return (
    <div className="mb-4 rounded-lg bg-[#F2F2F9] p-6 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#F8E9DD] p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#1C1B1F]"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-medium text-blue-800">{recipient}</h2>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between font-medium text-[#002776]">
            {accountName}
          </div>
          <span className="text-right text-lg font-medium text-blue-800">
            {amount} kr
          </span>
        </div>
      </div>

      {isSuspicious && (
        <div className="mb-4 flex items-center gap-2 text-sm text-blue-800">
          <AlertTriangle className="h-4 w-4 text-blue-800" />
          <span>Denne betalingen er flagget som mistenkelig</span>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleReject}
          className="w-1/3 rounded-xl border-2 border-[#002776] bg-inherit text-lg text-[#002776] hover:bg-blue-50"
        >
          Avis
        </button>
        <button
          onClick={handleApprove}
          className="w-2/3 rounded-xl bg-[#002776] text-lg text-white hover:bg-blue-900"
        >
          Godkjenn
        </button>
      </div>
    </div>
  );
};

export default ApprovalCard;
