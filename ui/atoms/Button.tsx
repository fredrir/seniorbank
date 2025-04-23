"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const buttonVariants = cva(
  cn(
    "inline-flex relative items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
    "focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none",
  ),
  {
    variants: {
      variant: {
        default: "bg-[#002776] text-white shadow hover:bg-[#002776]/90",
        destructive:
          "bg-destructive text-destructive-foreground outline-[#002776] outline-2 shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[#002776] bg-[#FDF8F5] text-[#002776] shadow-sm hover:bg-[#F8E9DD]",
        ghost: "bg-transparent text-[#002776] hover:bg-[#F8E9DD]",
      },
      size: {
        default: "h-8 px-4 py-2 text-sm",
        sm: "h-6 rounded-md px-2 text-xs",
        lg: "h-9 rounded-md px-6",
        icon: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  chevron?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, chevron, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
        {chevron && <ChevronRight className="absolute right-2 h-4 w-4" />}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
