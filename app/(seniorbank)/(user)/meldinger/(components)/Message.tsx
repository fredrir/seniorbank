import { MessageType } from "@/lib/types";
import {
  Bell,
  Mail,
  Settings,
  Shield,
  CreditCard,
  AlertCircle,
} from "lucide-react";

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const getIcon = () => {
    switch (message.icon) {
      case "bell":
        return <Bell size={20} style={{ color: message.iconColor }} />;
      case "mail":
        return <Mail size={20} style={{ color: message.iconColor }} />;
      case "settings":
        return <Settings size={20} style={{ color: message.iconColor }} />;
      case "shield":
        return <Shield size={20} style={{ color: message.iconColor }} />;
      case "credit-card":
        return <CreditCard size={20} style={{ color: message.iconColor }} />;
      case "alert":
        return <AlertCircle size={20} style={{ color: message.iconColor }} />;
      default:
        return <Mail size={20} style={{ color: message.iconColor }} />;
    }
  };

  return (
    <div
      className="rounded-lg border-l-4 p-4 shadow-sm"
      style={{
        backgroundColor: "#F2F2F9",
        borderLeftColor: message.borderColor,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div
            className="mr-3 rounded-full p-2"
            style={{ backgroundColor: message.iconBgColor }}
          >
            {getIcon()}
          </div>
          <div>
            <h3 className="mb-1 font-bold" style={{ color: "#002776" }}>
              {message.title}
            </h3>
            <p className="mb-2 text-sm" style={{ color: "#636363" }}>
              {message.content}
            </p>
            <span className="text-xs" style={{ color: "#636363" }}>
              Mottatt: {message.date}
            </span>
          </div>
        </div>
        <span
          className="rounded-full px-2 py-1 text-xs"
          style={{
            backgroundColor: message.isRead
              ? message.iconBgColor
              : message.borderColor,
            color: message.isRead ? "#005AA4" : "white",
          }}
        >
          {message.isRead ? "Lest" : "Ulest"}
        </span>
      </div>
    </div>
  );
}
