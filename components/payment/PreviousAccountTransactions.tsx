import React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

interface Option {
  title: string;
  accountNumber: number;
}
interface Props {
  options: Option[];  // Receive the array as a prop
}
const PreviousAccountTransactions = ({options}: Props) =>{
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
        <CommandGroup heading="Tildigere betalte kontoer">
        {options.map((option, index) => (
              <CommandItem key={index}>
                <span>{option.title} - {option.accountNumber}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>)}
      
    </Command>
  );
}





export default PreviousAccountTransactions;
// interface Props {
//   onClick: () => void;
//   title: string;
//   amount: number;
//   isSelected?: boolean;
// }
// { title, amount, onClick, isSelected }: Props


// function PreviousAccountTransactions() {
//   const [isFocused, setIsFocused] = useState(false);
//   return (
//     <Command className="rounded-lg border shadow-md md:min-w-[450]">
//       <CommandInput placeholder="Type a command or search" 
//       onFocus={() => setIsFocused(true)}
//       onBlur={() =>setIsFocused(false)}
//       />
//       {isFocused && 
//       (<CommandList>
//         <CommandEmpty>No results found</CommandEmpty>
//         <CommandGroup heading="Suggestions">
//           <CommandItem>
//             <Calendar />
//             <span>Calendar</span>
//           </CommandItem>
//         </CommandGroup>
//       </CommandList>)}
      
//     </Command>
//   );
// }














// const PreviousAccountTransactions = () => {
//   return (
//     <Command className="rounded-lg border shadow-md md:min-w-[450]">
//       <CommandInput placeholder="Type a command or search" />
//       <CommandList>
//         <CommandEmpty>No results found</CommandEmpty>
//         <CommandGroup heading="Suggestions">
//           <CommandItem>
//             <Calendar/>
//               <span>Calendar</span>
//           </CommandItem>
//           <CommandItem>
//             <Smile/>
//               <span>Search emoji</span>

//           </CommandItem>
//         </CommandGroup>
//       </CommandList>
//     </Command>
//   );
// };