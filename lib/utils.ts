import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert Persian digits to English digits
export function persianToEnglish(str: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return str.replace(/[۰-۹]/g, (char) => {
    const index = persianDigits.indexOf(char);
    return index !== -1 ? englishDigits[index] : char;
  });
}
