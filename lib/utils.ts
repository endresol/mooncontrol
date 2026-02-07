import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function holdingMonth(date: Date) {
  const prevMonth = new Date(date);
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  const year = prevMonth.getFullYear();
  const month = String(prevMonth.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}
