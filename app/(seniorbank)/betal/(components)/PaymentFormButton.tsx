import { cn } from "@/lib/utils";
import { Button } from "@/ui/atoms/Button";
import { PropsWithChildren } from "react";

export function PaymentFormNavbar({
  problem,
  children,
  onGoBack,
  onGoForward,
  hideBackButton,
}: PropsWithChildren<{
  problem?: string;
  hideBackButton?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
}>) {
  return (
    <div className="flex justify-between py-4">
      <Button
        onClick={onGoBack}
        className={cn("flex w-[45%] min-w-0 flex-col p-8 text-2xl", {
          invisible: hideBackButton,
        })}
      >
        Tilbake
      </Button>
      <Button
        onClick={onGoForward}
        className="flex w-[45%] min-w-0 flex-col p-8 text-2xl"
        disabled={Boolean(problem)}
      >
        {problem ? problem : children}
      </Button>
    </div>
  );
}
