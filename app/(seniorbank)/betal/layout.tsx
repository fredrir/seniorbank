import Heading from "@/ui/molecules/Heading";
import { PropsWithChildren } from "react";

export default function PaymentLayout({ children }: PropsWithChildren) {
  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width={100}
        height={100}
        className="absolute left-0 top-0 z-[-1] h-[500px] w-full text-[#015aa4]"
      >
        <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
      </svg>

      <Heading title="Betal faktura" className="mb-16" />

      {children}
    </>
  );
}
