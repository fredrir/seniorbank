"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay = ({
  isVisible,
  message = "Registrerer bruker...",
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-xl">
        <Loader2 className="size-16 animate-spin text-seniorBankDarkBlue" />
        <p className="mt-4 text-xl font-medium text-seniorBankDarkBlue">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
