import React, { useState } from "react";
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({searchInput, handleChange}: SearchBarProps) => {
  return (
    <div className="flex items-center border rounded-2xl bg-blue-500 pl-3">
      <Search className="size-8" />
      <input
        type="text"
        placeholder="Søk"
        onChange={handleChange}
        value={searchInput}
        className="bg-blue-300 w-full p-4"
      />
    </div>
  );
};

export default SearchBar;