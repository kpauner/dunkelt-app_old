import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { getLocale } from "next-intl/server";
import { CharacterResponseType } from "@/types/characters";
import { Session } from "next-auth";
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

export function truncateParagraphs(
  text: string | string[],
  maxWords: number
): string {
  // Convert single string to array for consistent processing
  const paragraphs = Array.isArray(text) ? text : [text];

  let wordCount = 0;
  const truncatedParagraphs: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(" ");

    if (wordCount + words.length <= maxWords) {
      truncatedParagraphs.push(paragraph);
      wordCount += words.length;
    } else {
      const remainingWords = maxWords - wordCount;
      const truncatedParagraph = words.slice(0, remainingWords).join(" ");
      truncatedParagraphs.push(truncatedParagraph + "...");
      break;
    }
  }

  // Join paragraphs with newline characters
  return truncatedParagraphs.join("\n\n");
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

// Playbook utils
export function calculateLevel(experience: number) {
  const level = Math.floor(experience / 5) + 1;
  const experienceInCurrentLevel = experience % 5;

  return {
    level,
    experienceInCurrentLevel,
  };
}
