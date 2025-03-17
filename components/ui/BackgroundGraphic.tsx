import { cn } from "@/lib/utils";

type GraphicVariant =
  | "top-halfcircle"
  | "bottom-halfcircle"
  | "topwave"
  | "inverse-topwave";

export function BackgroundGraphic({
  variant,
  className,
}: {
  variant: GraphicVariant;
  className?: string;
}) {
  switch (variant) {
    case "top-halfcircle":
      return (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width={100}
          height={100}
          className={cn("absolute left-0 z-[-1] h-[500px] w-full", className)}
        >
          <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
        </svg>
      );

    case "bottom-halfcircle":
      return (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width={100}
          height={100}
          className={cn(
            "absolute left-0 z-[-1] h-[200px] w-full md:h-[400px]",
            className,
          )}
        >
          <path d="M0 100 L0 50 Q50 0 100 50 L100 100" fill="currentColor" />
        </svg>
      );
    case "topwave":
      return (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width={100}
          height={100}
          className={cn("absolute left-0 z-[-1] h-[500px] w-full", className)}
        >
          <path
            d="M0 80 C20 95, 50 90, 70 70 S100 75, 100 75 L100 100 L0 100 Z"
            fill="currentColor"
          />
        </svg>
      );
    case "inverse-topwave":
      return (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width={100}
          height={100}
          className={cn("absolute left-0 z-[-1] h-[500px] w-full", className)}
        >
          <path
            d="M0 0 L0 75 C20 65, 50 70, 70 90 S100 95, 100 90 L100 0 Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}
