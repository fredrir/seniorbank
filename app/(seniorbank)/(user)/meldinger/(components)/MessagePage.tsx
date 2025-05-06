"use client";

import { useState, useMemo } from "react";
import { MessageType } from "@/lib/types";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";

interface Props {
  messageData: MessageType[];
  safetyContact?: boolean;
}

const MessagePage = ({ messageData, safetyContact = false }: Props) => {
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
          safetyContact={safetyContact}
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
};

export default MessagePage;
