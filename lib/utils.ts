import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isArabic = (text: string) => {
  const firstLetterAscii = text.trim().charCodeAt(0);
  return firstLetterAscii > 255 ? true : false;
};
