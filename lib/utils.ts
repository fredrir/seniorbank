import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sum({ a, b }: { a: number; b: number }) {
  return a + b;
}

export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function formatCurrency(amount: number, withDecimals = false) {
  return amount.toLocaleString("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  });
}

export function formatWeekday(date: Date) {
  return date.toLocaleString("nb-NO", { weekday: "long" });
}

export function formatDateNumeric(date: Date) {
  return date.toLocaleString("nb-NO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
