import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  // fallback to clsx if 'tailwind-merge' is not installed
  return clsx(inputs)
}