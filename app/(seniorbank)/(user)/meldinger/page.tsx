"use client";

import { useState, useMemo } from "react";
import { MessageType } from "@/lib/types";
import MessageList from "./(components)/MessageList";
import MessageHeader from "./(components)/MessageHeader";

export const messageData: MessageType[] = [
  {
    id: "1",
    title: "Viktig informasjon om din konto",
    content:
      "Vi har oppdatert våre vilkår og betingelser. Vennligst les gjennom og godkjenn de nye vilkårene.",
    date: "05.05.2025",
    isRead: false,
    icon: "bell",
    iconColor: "#EC7B7C",
    iconBgColor: "#FDEBE8",
    borderColor: "#EC7B7C",
  },
  {
    id: "2",
    title: "Sikkerhetsvarsling",
    content:
      "Vi har oppdaget uvanlig aktivitet på din konto. Vennligst bekreft at det var deg som logget inn fra en ny enhet.",
    date: "03.05.2025",
    isRead: false,
    icon: "shield",
    iconColor: "#EC7B7C",
    iconBgColor: "#FDEBE8",
    borderColor: "#EC7B7C",
  },
  {
    id: "3",
    title: "Kvartalsrapport",
    content:
      "Din kvartalsrapport for Q1 2025 er nå tilgjengelig. Klikk for å se detaljer om din økonomi.",
    date: "01.04.2025",
    isRead: true,
    icon: "mail",
    iconColor: "#005AA4",
    iconBgColor: "#C2E7DA",
    borderColor: "#70C7A9",
  },
  {
    id: "4",
    title: "Systemoppdatering",
    content:
      "Vi har oppdatert våre systemer for å gi deg en bedre brukeropplevelse. Nye funksjoner inkluderer forbedret sikkerhet og raskere overføringer.",
    date: "15.03.2025",
    isRead: true,
    icon: "settings",
    iconColor: "#005AA4",
    iconBgColor: "#B3CEE4",
    borderColor: "#B3CEE4",
  },
  {
    id: "5",
    title: "Betalingspåminnelse",
    content:
      "Dette er en påminnelse om at din regning på kr 1.250,00 forfaller til betaling om 3 dager.",
    date: "10.03.2025",
    isRead: true,
    icon: "credit-card",
    iconColor: "#005AA4",
    iconBgColor: "#D3D3E8",
    borderColor: "#B3CEE4",
  },
  {
    id: "6",
    title: "Ny tjeneste tilgjengelig",
    content:
      "Vi har lansert en ny sparekonto med høyere rente. Sjekk ut vårt tilbud og start å spare mer i dag!",
    date: "01.03.2025",
    isRead: true,
    icon: "alert",
    iconColor: "#005AA4",
    iconBgColor: "#D3D3E8",
    borderColor: "#B3CEE4",
  },
];

export default function MeldingerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split(".");
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredAndSortedMessages = useMemo(() => {
    let filtered = messageData.filter((message) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        message.title.toLowerCase().includes(searchLower) ||
        message.content.toLowerCase().includes(searchLower)
      );
    });

    if (filterOption === "read") {
      filtered = filtered.filter((message) => message.isRead);
    } else if (filterOption === "unread") {
      filtered = filtered.filter((message) => !message.isRead);
    }

    return filtered.sort((a, b) => {
      if (sortOption === "newest") {
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      } else if (sortOption === "oldest") {
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      } else if (sortOption === "unread") {
        if (a.isRead !== b.isRead) {
          return a.isRead ? 1 : -1;
        }
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      }
      return 0;
    });
  }, [searchQuery, filterOption, sortOption]);

  return (
    <div className="flex min-h-[60vh] flex-col">
      <div className="container mx-auto px-4 py-8">
        <MessageHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <MessageList messages={filteredAndSortedMessages} />

        {filteredAndSortedMessages.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            Ingen meldinger funnet
          </div>
        )}

        {filteredAndSortedMessages.length < messageData.length &&
          searchQuery === "" && (
            <div className="mt-8 text-center">
              <button
                className="rounded-md px-6 py-2 font-medium"
                style={{ backgroundColor: "#D3D3E8", color: "#002776" }}
              >
                Last flere meldinger
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
