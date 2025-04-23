"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function SuccessToast() {
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!hasShownToast) {
      toast.success(
        "Overføringen er gjennomført. Trygghetskontrakten er varslet.",
        {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#D3D3EA",
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
      );
      setHasShownToast(true);
    }
  }, [hasShownToast]);

  return null;
}
