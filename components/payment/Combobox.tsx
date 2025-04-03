"use client";

import * as React from "react";
import { Check } from "lucide-react";

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

  // const handleSelect = (selectedValue: string) => { 
  //   setValue(selectedValue)
  //   setInputValue(selectedValue) //Oppdaterer inputfield med selection
  //   setOpen(false)
  // }

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
          // className="flex items-start h-20 border-2 text-left text-black border-seniorBankDarkBlue bg-seniorbankWhite pb-2 pr-10 pt-2 !text-2xl placeholder:text-2xl rounded-md"
          className="!text-green-700 inline-flex relative items-center justify-start m-0 p-4 h-20 bg-seniorbankWhite border-2 border-seniorBankDarkBlue rounded-md hover:text-red-900 hover:bg-red-900"
        >
          {value ? value: "Skriv inn kontonummer her ..."}
          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
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
            className="h-20   pb-2 pr-10 pt-2 !text-2xl placeholder:text-2xl rounded-md"

          />
          <CommandList>
            {frameworks.length>0 ? (<CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                className="h-20   pb-2 pr-10 pt-2 !text-2xl placeholder:text-2xl rounded-md"

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
              <CommandItem onSelect={handleAddCustomOption} className="text-blue-600 cursor-pointer h-14">
                <Check className="mr-2 h-14 w-4 opacity-0 "></Check>
                Add {inputValue}
              </CommandItem>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default Combobox;
