"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  title?: string;
}

export function SuccessToast({ title = "Overføringen" }: Props) {
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!hasShownToast) {
      toast.success(
        `${title} er gjennomført. Trygghetskontrakten er varslet.`,
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
  }, [hasShownToast, title]);

  return null;
}
