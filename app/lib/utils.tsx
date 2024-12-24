import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatQueryParam(query: string) {
  return query.replace(/\s+/g, ' ').trim()
}
