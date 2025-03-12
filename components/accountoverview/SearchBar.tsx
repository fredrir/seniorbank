import React, { useState } from "react";
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchInput, handleChange }: SearchBarProps) => {
  return (
    <label htmlFor="search-input" className="flex items-center border rounded-2xl bg-[#4D8CBF] cursor-pointer w-full text-white">
      <Search className="size-8 m-2" />
      <input
        id="search-input"
        type="text"
        placeholder="Søk"
        onChange={handleChange}
        value={searchInput}
        className="bg-[#4D8CBF] placeholder:text-white text-2xl cursor-pointer w-full outline-none"
      />
    </label>
  );
};

export default SearchBar;