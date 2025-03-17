import React, { useState } from "react";
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchInput, handleChange }: SearchBarProps) => {
  return (
    <label htmlFor="search-input" className="flex items-center border-2 border-[#4D8CBF] rounded-2xl hover:border-seniorBankLightBlue bg-[#4D8CBF] cursor-pointer w-full text-white px-2">
      <Search className="size-8 m-2" />
      <input
        id="search-input"
        type="text"
        placeholder="Søk"
        onChange={handleChange}
        value={searchInput}
        className="bg-[#4D8CBF] placeholder:text-white text-2xl cursor-pointer outline-none w-full"
      />
    </label>
  );
};

export default SearchBar;