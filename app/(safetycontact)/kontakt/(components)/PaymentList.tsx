"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import PaymentCard from "./PaymentCard";

type PaymentStatus = "Godkjent" | "Avvist" | "Venter";

// Define payment data structure
interface Payment {
  id: string;
  date: string;
  amount: number;
  recipient: string;
  status: PaymentStatus;
}

// Sample payment data
const payments: Payment[] = [
  {
    id: "1",
    date: "02.02.2025",
    amount: 15000,
    recipient: "Hansen byggeselskap AS",
    status: "Godkjent",
  },
  {
    id: "2",
    date: "04.10.2025",
    amount: 150000,
    recipient: "Slim Shady",
    status: "Avvist",
  },
  {
    id: "3",
    date: "29.05.2025",
    amount: 19000,
    recipient: "Sparebank eiendom",
    status: "Venter",
  },
  {
    id: "4",
    date: "02.02.2025",
    amount: 15000,
    recipient: "Hansen byggeselskap AS",
    status: "Godkjent",
  },
];

export default function PaymentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Alle");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.date.includes(searchQuery) ||
      payment.amount.toString().includes(searchQuery);

    const matchesFilter = filter === "Alle" || payment.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom select options
  const options = ["Alle", "Godkjent", "Avvist", "Venter"];

  return (
    <div className="min-h-[60vh] space-y-4 overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full rounded-md border bg-gray-200 py-1 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Søk etter betalinger..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md border bg-gray-200 px-4 py-1 text-left text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{filter}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            <ul
              className="max-h-60 overflow-auto py-1"
              role="listbox"
              aria-labelledby="custom-select"
              tabIndex={-1}
            >
              {options.map((option) => (
                <li
                  key={option}
                  className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${
                    filter === option
                      ? "bg-gray-50 font-medium text-blue-600"
                      : ""
                  }`}
                  role="option"
                  aria-selected={filter === option}
                  onClick={() => {
                    setFilter(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
}
