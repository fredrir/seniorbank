"use client";

import Heading from "@/ui/molecules/Heading";
import { Filter, Search, X } from "lucide-react";
import { useState } from "react";

interface MessageHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterOption: string;
  setFilterOption: (option: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

export default function MessageHeader({
  searchQuery,
  setSearchQuery,
  filterOption,
  setFilterOption,
  sortOption,
  setSortOption,
}: MessageHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between">
        <Heading title="Meldinger" className="text-seniorBankDarkBlue" />
        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium ${
              isFilterOpen || filterOption !== "all"
                ? "bg-seniorBankDarkBlue text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} />
            <span>Filter</span>
            {filterOption !== "all" && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-seniorBankDarkBlue">
                1
              </span>
            )}
          </button>
          <select
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Nyeste først</option>
            <option value="oldest">Eldste først</option>
            <option value="unread">Uleste først</option>
          </select>
        </div>
      </div>

      {/* Search input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-10 text-sm"
          placeholder="Søk i meldinger..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Filter dropdown */}
      {isFilterOpen && (
        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
          <div className="space-y-2">
            <div className="text-sm font-medium">Filtrer etter status</div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`rounded-md px-3 py-1 text-sm ${
                  filterOption === "all"
                    ? "bg-seniorBankDarkBlue text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setFilterOption("all")}
              >
                Alle
              </button>
              <button
                className={`rounded-md px-3 py-1 text-sm ${
                  filterOption === "unread"
                    ? "bg-seniorBankDarkBlue text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setFilterOption("unread")}
              >
                Uleste
              </button>
              <button
                className={`rounded-md px-3 py-1 text-sm ${
                  filterOption === "read"
                    ? "bg-seniorBankDarkBlue text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setFilterOption("read")}
              >
                Leste
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
