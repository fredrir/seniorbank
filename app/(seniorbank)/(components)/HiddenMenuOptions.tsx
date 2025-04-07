"use client";
import { ChevronDown } from "lucide-react";
import MenuOption from "./MenuOptions";
import { useState } from "react";

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

  return (
    <section className="mt-16">
      <button
        onClick={() => setShowHidden(!showHidden)}
        className="group flex items-center gap-2 py-8 text-4xl font-bold text-seniorBankDarkBlue hover:opacity-80"
      >
        Flere handlinger
        <ChevronDown
          className={`size-16 ${showHidden ? "rotate-180" : ""} transition-transform duration-300`}
        />
      </button>

      {hiddenMenuOptions.length > 0 && showHidden && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
