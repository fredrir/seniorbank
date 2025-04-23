import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>
    <BackgroundGraphic
      variant="top-halfcircle"
      className="text-[#015aa4] h-[800px]"
    />
    <div>
      { children }
    </div>
  </section>
}