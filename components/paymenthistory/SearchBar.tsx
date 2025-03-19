import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchInput, handleChange }: SearchBarProps) => {
  return (
    <label
      htmlFor="search-input"
      className="flex w-full cursor-pointer items-center rounded-2xl border-2 border-[#4D8CBF] bg-[#4D8CBF] px-2 text-white hover:border-seniorBankLightBlue"
    >
      <Search className="m-2 size-6 md:size-8" />
      <input
        id="search-input"
        type="text"
        placeholder="Søk"
        onChange={handleChange}
        value={searchInput}
        className="w-full bg-[#4D8CBF] text-lg outline-none placeholder:text-white md:text-2xl"
      />
    </label>
  );
};

export default SearchBar;
