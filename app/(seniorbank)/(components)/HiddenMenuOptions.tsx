"use client";

import type React from "react";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useId } from "react";
import MenuOption from "./MenuOptions";

interface Props {
  hiddenMenuOptions: {
    title: string;
    description: string;
    icon: React.ReactNode;
    href?: string;
  }[];
}

const HiddenMenuOptions = ({ hiddenMenuOptions }: Props) => {
  const [showHidden, setShowHidden] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const menuId = useId();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showHidden) {
        setShowHidden(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHidden]);

  useEffect(() => {
    if (showHidden && menuRef.current) {
      const firstFocusableElement = menuRef.current.querySelector(
        "a",
      ) as HTMLElement;
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }, [showHidden]);

  return (
    <section className="mt-16">
      <button
        id={buttonId}
        onClick={() => setShowHidden(!showHidden)}
        className="group flex items-center gap-2 rounded-md px-4 py-8 text-4xl font-bold text-seniorBankDarkBlue hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-expanded={showHidden}
        aria-controls={menuId}
      >
        <span>Flere handlinger</span>
        <ChevronDown
          className={`size-16 ${showHidden ? "rotate-180" : ""} transition-transform duration-300`}
          aria-hidden="true"
        />
      </button>

      {hiddenMenuOptions.length > 0 && showHidden && (
        <div
          id={menuId}
          ref={menuRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          role="region"
          aria-labelledby={buttonId}
        >
          {hiddenMenuOptions.map((option, index) => (
            <MenuOption
              title={option.title}
              description={option.description}
              icon={option.icon}
              href={option.href}
              key={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HiddenMenuOptions;
