import React, { useState } from "react";
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({searchInput, handleChange}: SearchBarProps) => {
  return (
    <div className="flex items-center border rounded-2xl bg-[#4D8CBF] text-white">
      <Search className="size-8" />
      <input
        type="text"
        placeholder="Søk"
        onChange={handleChange}
        value={searchInput}
        className="bg-[#4D8CBF] w-full p-4 placeholder:text-white"
      />
    </div>
  );
};

export default SearchBar;