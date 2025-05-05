"use client";

import type { MessageType } from "@/lib/types";
import Message from "./Message";
import { AnimatePresence, motion } from "framer-motion";

interface MessageListProps {
  messages: MessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Message message={message} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
