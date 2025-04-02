
import React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { useState } from "react";
interface Props {
    accountNumbers: number[];
    onClick: () => void;
}

const Ptest = ({accountNumbers, onClick}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450]">
      <CommandInput placeholder="Type a command or search" 
      onFocus={() => setIsFocused(true)}
      onBlur={() =>setIsFocused(false)}
      />
      {isFocused && 
      (<CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading="Suggestions">
        {accountNumbers.map((accountNumber, index) => (
              <CommandItem key={index}>
                <Button className="bg-white text-black" onClick={onClick}>{accountNumber} </Button>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>)}
    </Command>
  );
}
export default Ptest