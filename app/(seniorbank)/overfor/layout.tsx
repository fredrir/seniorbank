import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";
import Heading from "@/ui/molecules/Heading";
import { PropsWithChildren } from "react";

export default function OverforLayout({ children }: PropsWithChildren) {
  return (
    <section className="container mx-auto h-[60vh]">
      <BackgroundGraphic variant="top-halfcircle" className="text-[#015aa4]" />
      <Heading
        title="Overfør"
        className="mb-4 text-5xl font-bold text-seniorbankWhite"
      />
      <div className="flex w-full justify-center font-bold">{children}</div>
    </section>
  );
}
