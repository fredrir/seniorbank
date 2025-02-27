import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

interface sumparams {
  a: number
  b: number
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sum({ a, b }: sumparams) {
  return a + b
}