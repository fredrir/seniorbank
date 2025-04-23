"use client";

import { Input } from "@/ui/atoms/Input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/70" />
      <Input
        className="w-full rounded-full border-none bg-[#4D8CBF] pl-10 text-white placeholder:text-white/70"
        placeholder={isPending ? "Laster..." : "Søk.."}
        value={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Søk transaksjoner"
      />
    </div>
  );
}
