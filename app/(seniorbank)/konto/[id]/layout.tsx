import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <BackgroundGraphic
        variant="top-halfcircle"
        className="h-[800px] text-[#015aa4]"
      />
      <div>{children}</div>
    </section>
  );
}
