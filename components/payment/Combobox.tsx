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
    value: "1836.82.37294",
    label: "1836.82.37294",
  },
  {
    value: "4839.47.24957",
    label: "4839.47.24957",
  },
  {
    value: "2845.92.37593",
    label: "2845.92.37593",
  },
];
interface ComboboxProps {
  onSelectAccount: (account: string) => void;
}
export function Combobox({ onSelectAccount }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [inputValue, setInputValue] = React.useState("");
  const [accounts, setAccounts] = React.useState(initialFrameworks);

  const validAccountInput = (inputValue: string) => {
    const regex = /^[0-9]{4}\.[0-9]{2}\.[0-9]{5}$/;
    return regex.test(inputValue);
  };

  const handleAddCustomOption = () => {
    if (!validAccountInput(inputValue)) {
      alert("Ugyldig format, bruk: xxxx.xx.xxxxx");
    }

    if (
      !accounts.some((ac) => ac.value === inputValue) &&
      validAccountInput(inputValue)
    ) {
      const newOption = { value: inputValue, label: inputValue };
      setAccounts([...accounts, newOption]);
      onSelectAccount(inputValue);
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
          {validAccountInput(value) ? (
            <span className="text-seniorBankDarkBlue">{value}</span>
          ) : (
            "Skriv inn kontonummer her ..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--trigger-width)] min-w-[800px] p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Skriv inn kontonummer: xxxx.xx.xxxx "
            value={inputValue}
            onValueChange={setInputValue}
            className="h-20 rounded-md pb-2 pr-10 pt-2 !text-2xl placeholder:text-2xl"
          />
          <CommandList>
            {accounts.length > 0 ? (
              <CommandGroup>
                {accounts.map((framework) => (
                  <CommandItem
                    className="h-20 rounded-md pb-2 pr-10 pt-2 !text-2xl placeholder:text-2xl"
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onSelectAccount(currentValue);
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
              <CommandEmpty></CommandEmpty>
            )}
            {inputValue.trim() &&
              !accounts.some((ac) => ac.value === inputValue) && (
                <CommandItem
                  onSelect={handleAddCustomOption}
                  className="h-14 cursor-pointer text-blue-600"
                >
                  <Check className="mr-2 h-14 w-4 opacity-0"></Check>
                  Legg til: {inputValue}
                </CommandItem>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default Combobox;
