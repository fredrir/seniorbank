"use client";

import { CalendarIcon, AlertTriangle, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/atoms/Button";
import { Calendar } from "@/ui/atoms/calendar";
import { Popover, PopoverContent } from "@/ui/atoms/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import toast from "react-hot-toast";
import Link from "next/link";

//TODO mock
const accounts = [
  {
    title: "Brukskonto",
    value: "brukskonto",
  },
  {
    title: "Sparekonto",
    value: "sparekonto",
  },
];

interface Props {
  recipient: string;
  amount: string;
  date?: Date;
  isSuspicious?: boolean;
  onReject: () => void;
  onApprove: () => void;
  isAdvanced?: boolean;
  readMore?: boolean;
}

const ApprovalCard = ({
  recipient,
  amount,
  date: initialDate,
  isSuspicious = false,
  onReject,
  onApprove,
  isAdvanced = false,
  readMore = false,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [date, setDate] = useState<Date>(initialDate || new Date());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectAccount = (account: (typeof accounts)[0]) => {
    setSelectedAccount(account);
    setIsOpen(false);
  };

  const handlePayToday = () => {
    setDate(new Date());
  };

  // Call the parent component's handlers
  const handleReject = () => {
    toast.error(`Betaling til ${recipient} på ${amount} kr er avvist.`, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#F2F2F9",
        color: "#1C1B1F",
        fontSize: "16px",
        fontWeight: "500",
      },
    });
    onReject();
  };

  const handleApprove = () => {
    toast.success(`Betaling til ${recipient} på ${amount} kr er godkjent.`, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#002776",
        color: "#FFFFFF",
        fontSize: "16px",
        fontWeight: "500",
      },
    });
    onApprove();
  };

  return (
    <div className="mb-4 rounded-lg bg-[#F2F2F9] p-6 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#F8E9DD] p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#1C1B1F]"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-medium text-blue-800">{recipient}</h2>
            <p className="text-sm text-gray-500">Evt melding fra bruker</p>
          </div>
        </div>
        <span className="text-lg font-medium text-blue-800">{amount} kr</span>
      </div>

      {isSuspicious && (
        <div className="mb-4 flex items-center gap-2 text-sm text-blue-800">
          <AlertTriangle className="h-4 w-4 text-blue-800" />
          <span>Denne betalingen er flagget som mistenkelig</span>
        </div>
      )}

      {isAdvanced && (
        <>
          <div className="mb-4">
            <label className="mb-1 block font-medium text-[#002776]">
              Konto:
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex w-full items-center justify-between rounded-md bg-gray-200 px-3 py-1 text-left text-gray-700 hover:bg-gray-300"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <span>{selectedAccount.title}</span>
                <ChevronDown
                  className={`h-5 w-5 text-blue-800 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <ul className="max-h-60 overflow-auto" role="listbox">
                    {accounts.map((account) => (
                      <li
                        key={account.value}
                        className={`cursor-pointer px-3 py-2 text-gray-700 hover:bg-gray-100 ${
                          selectedAccount.value === account.value
                            ? "bg-gray-50 font-medium"
                            : ""
                        }`}
                        role="option"
                        aria-selected={selectedAccount.value === account.value}
                        onClick={() => handleSelectAccount(account)}
                      >
                        {account.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-1 block font-medium text-[#002776]">
              Forfall:
            </label>
            <div className="flex items-center gap-6">
              <div className="w-2/3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        "flex w-full justify-between rounded-md border-gray-300 bg-gray-200 px-4 py-0 text-left text-base font-normal text-gray-700 hover:bg-gray-300",
                        !date && "text-muted-foreground",
                      )}
                    >
                      {date ? (
                        format(date, "dd.MM.yyyy", { locale: nb })
                      ) : (
                        <span>Velg dato</span>
                      )}
                      <CalendarIcon className="mr-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                      locale={nb}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <button
                className="w-1/3 rounded-xl border-2 border-[#002776] bg-inherit py-1 text-lg text-[#002776] hover:bg-blue-50"
                onClick={handlePayToday}
              >
                Betal i dag
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleReject}
          className="w-1/3 rounded-xl border-2 border-[#002776] bg-inherit text-lg text-[#002776] hover:bg-blue-50"
        >
          Avis
        </button>
        <button
          onClick={handleApprove}
          className="w-2/3 rounded-xl bg-[#002776] text-lg text-white hover:bg-blue-900"
        >
          Godkjenn
        </button>
      </div>

      {readMore && (
        <Link
          href={"/kontakt/bekreft"}
          className="mt-4 flex items-center justify-end gap-2 text-sm text-blue-800 underline"
        >
          <span>Les mer</span>
          <ChevronDown className="h-4 w-4 text-blue-800" />
        </Link>
      )}
    </div>
  );
};

export default ApprovalCard;
