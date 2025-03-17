"use client";
import React, { useState } from "react";
import PaymentHistoryGrid from "@/components/accountoverview/PaymentHistoryGrid";
import SearchBar from "@/components/accountoverview/SearchBar";
import { BackgroundGraphic } from "@/components/ui/BackgroundGraphic";

export default function AccountOverview() {
  const [searchInput, setSearchInput] = useState("");

  const transactions = [
    {
      title: "Rema 1000",
      description: "Dagligvare",
      amount: "-826.87 kr",
    },
    {
      title: "SIT kantine",
      description: "Dagligvare",
      amount: "-45.87 kr",
    },
    {
      title: "Transaksjon",
      description: "Transaksjon",
      amount: "14000.00 kr",
      transactionAlert: true,
    },
    {
      title: "Joker Stud.samf.",
      description: "Dagligvare",
      amount: "-72.46 kr",
    },
    {
      day: "Onsdag",
      date: "03 Januar 2025",
    },
    {
      title: "Klippers",
      description: "Kosmetikk",
      amount: "-599.00 kr",
    },
    {
      title: "Nigerian Prince",
      description: "Kosmetikk",
      amount: "-59999.00 kr",
      warningAlert: true,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <main>
      <BackgroundGraphic variant="top-halfcircle" className="text-[#015aa4]" />
      <div className="space-y-10">
        <header className="text-center text-white p-2">
          <h2 className="text-4xl">Saldo</h2>
          <h1 className="text-7xl font-bold">18 932.54kr</h1>
        </header>
        <SearchBar searchInput={searchInput} handleChange={handleChange} />
        <PaymentHistoryGrid transactions={transactions} />
      </div>
    </main>
  );
};