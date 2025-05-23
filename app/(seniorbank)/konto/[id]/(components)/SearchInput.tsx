"use client";

import { Input } from "@/ui/atoms/Input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function SearchInput({
  initialSearch = "",
}: {
  initialSearch?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch || currentSearch);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        startTransition(() => {
          const params = new URLSearchParams(searchParams);

          if (searchTerm) {
            params.set("search", searchTerm);
          } else {
            params.delete("search");
          }

          router.replace(`?${params.toString()}`, { scroll: false });
        });
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, router, searchParams, currentSearch]);

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/70" />
      <Input
        className="w-full rounded-full border-none bg-[#4D8CBF] pl-10 text-white placeholder:text-white/70"
        placeholder={isPending ? "Laster..." : "Søk.."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Søk transaksjoner"
      />
    </div>
  );
}
