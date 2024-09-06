import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { getLocale } from "next-intl/server";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 16);

export function generatePublicId() {
  return nanoid();
}

export function getIsActive(href: string, pathname: string, locale: string) {
  const path = href === "/" ? `/${locale}` : `/${locale}${href}`;
  return href === "/"
    ? pathname === `/${locale}` || pathname === `/${locale}/`
    : pathname.startsWith(path);
}

export const getBaseUrl = (path: string = "") => {
  let baseUrl = "http://localhost:3000";

  if (process.env.NEXT_PUBLIC_APP_URL) {
    baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  } else if (
    process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  } else if (process.env.VERCEL_URL) {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }

  // Ensure path starts with a slash if it's not empty
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  return `${baseUrl}${normalizedPath}`;
};
