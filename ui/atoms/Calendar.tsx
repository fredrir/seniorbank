"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("rounded-md bg-[#FDF8F5] p-1", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0",
        month: "space-y-2",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-xs font-medium text-[#002776]",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "default", size: "icon" }),
          "h-5 w-5 bg-transparent p-0 mx-2 text-[#002776] hover:bg-[#F8E9DD] hover:text-[#002776]",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-[#002776] rounded-md w-6 font-normal text-[0.6rem]",
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-0 text-center text-[0.6rem] focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#F8E9DD] [&:has([aria-selected].day-outside)]:bg-[#F8E9DD]/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-5 w-5 p-0 font-normal text-[0.6rem] aria-selected:opacity-100",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#002776] text-white hover:bg-[#002776] hover:text-white focus:bg-[#002776] focus:text-white",
        day_today: "bg-[#F8E9DD] text-[#002776]",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-[#F8E9DD]/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-[#F8E9DD] aria-selected:text-[#002776]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-2.5 w-2.5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-2.5 w-2.5", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
