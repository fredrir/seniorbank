import { capitalize, formatWeekday, formatDateNumeric } from "@/lib/utils";

export function TransactionListDateDivider({ date }: { date: Date }) {
  return (
    <div className="flex justify-between border-b-2 border-[#4D8CBF] bg-[#b3cee4] px-4 py-1 text-sm text-[#636363]">
      <span>{capitalize(formatWeekday(date))}</span>
      <span>{formatDateNumeric(date)}</span>
    </div>
  );
}
