"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const initialFrameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [inputValue, setInputValue] = React.useState("");
  const [frameworks, setFrameworks] = React.useState(initialFrameworks);

  const handleSelect = (selectedValue: string) => { 
    setValue(selectedValue)
    setInputValue(selectedValue) //Oppdaterer inputfield med selection
    setOpen(false)
  }

  const handleAddCustomOption = () => {
    if (inputValue.trim() && !frameworks.some((fw) => fw.value === inputValue)) {
      const newOption = { value: inputValue, label: inputValue}
      setFrameworks([...frameworks, newOption])
    }
    setValue(inputValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value: "Select or type a framework"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--trigger-width)] min-w-[800px] p-0"
        align="start"
      >
        <Command>
          <CommandInput
placeholder="Search framework or type a new one... "
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {frameworks.length>0 ? (<CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  className="w-full"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>): (
              <CommandEmpty>No framework found.</CommandEmpty>
            )}
            {inputValue.trim() && !frameworks.some((fw) => fw.value === inputValue) && (
              <CommandItem onSelect={handleAddCustomOption} className="text-blue-600 cursor-pointer">
                <Check className="mr-2 h-4 w-4 opacity-0"></Check>
                Add "{inputValue}"
              </CommandItem>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default Combobox;
