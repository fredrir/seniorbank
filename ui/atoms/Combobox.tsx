"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/atoms/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/atoms/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/atoms/Popover";
import { useState } from "react";

interface ComboboxProps {
  defaultOptions?: { value: string; label: string }[];
  onChange: (account: string) => void;
  isInputInvalid: (inputValue: string) => string | boolean;
  inputPlaceholder?: string;
}

export function Combobox({
  onChange,
  isInputInvalid,
  defaultOptions,
  inputPlaceholder,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(defaultOptions || []);

  const handleAddCustomOption = () => {
    const inputError = isInputInvalid(inputValue);
    if (inputError) {
      alert(typeof inputError === "string" ? inputError : "Invalid input");

      return;
    }

    if (!options.some((ac) => ac.value === inputValue)) {
      const newOption = { value: inputValue, label: inputValue };
      setOptions([...options, newOption]);
      onChange(inputValue);
    }

    setValue(inputValue);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="m-0 h-20 justify-start rounded-md border-2 border-seniorBankDarkBlue bg-seniorbankWhite p-4 text-gray-500 hover:bg-seniorbankWhite"
        >
          <span className="text-lg font-bold text-seniorBankDarkBlue">
            {value || "Trykk for å velge konto..."}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--trigger-width)] min-w-[800px] p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={inputPlaceholder}
            value={inputValue}
            onValueChange={setInputValue}
            className="h-20 rounded-md pb-2 pr-10 pt-2 !text-2xl placeholder:text-2xl"
          />
          <CommandList>
            {options.length > 0 ? (
              <CommandGroup>
                {options.map((framework) => (
                  <CommandItem
                    className="h-20 rounded-md pb-2 pr-10 pt-2 !text-2xl placeholder:text-2xl"
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onChange(currentValue);
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
              </CommandGroup>
            ) : (
              <CommandEmpty />
            )}
            {inputValue.trim() &&
              !options.some((ac) => ac.value === inputValue) && (
                <CommandItem
                  onSelect={handleAddCustomOption}
                  className="h-14 cursor-pointer text-blue-600"
                >
                  <div className="px-2">
                    <p className="text-2xl">Legg til: {inputValue}</p>
                  </div>
                </CommandItem>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default Combobox;
