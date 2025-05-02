"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import PaymentCard from "./PaymentCard";
import { TransactionListData } from "@/model/application/BankAccountService";
import { ApprovalStatus } from "@/model/domain/payment/Transaction";

export default function PaymentList({
  transactionData: { transactions, peerAccountDetails },
}: {
  transactionData: TransactionListData;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<ApprovalStatus | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredPayments = transactions.filter((transaction) => {
    if (transaction.approvalStatus === null) {
      return false;
    }

    const peerAccount = peerAccountDetails.find(
      (peer) => peer.id === transaction.peerAccountId,
    )!;
    const matchesSearch =
      peerAccount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peerAccount.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.dueDate.toString().includes(searchQuery) ||
      transaction.amount.toString().includes(searchQuery);

    const matchesFilter =
      filter === undefined || transaction.approvalStatus === filter;

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

  const options = [
    [undefined, "Alle"],
    ["APPROVED", "Godkjent"],
    ["DENIED", "Avslått"],
  ] as const;

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
          <span>{options.find(([option]) => filter === option)![1]}</span>
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
              {options.map(([option, label]) => (
                <li
                  key={option ?? "undefined"}
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
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredPayments.map((transaction) => {
          const peerAccount = peerAccountDetails.find(
            (peer) => transaction.peerAccountId === peer.id,
          )!;
          return (
            <PaymentCard
              key={`${transaction.id} ${transaction.direction}`}
              date={new Date(transaction.dueDate)}
              recipient={peerAccount.name}
              status={transaction.approvalStatus}
              amount={transaction.amount}
            />
          );
        })}
      </div>
    </div>
  );
}
