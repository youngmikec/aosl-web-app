import type { BlogAuthor, BlogPost } from "../../models";
import { plainText } from "../../utils/sanitizeHtml";

export const categoryLabel = (c: string) => (c ? c.charAt(0) + c.slice(1).toLowerCase() : "General");

export const authorName = (author: BlogPost["author"]): string => {
  const a = author && typeof author === "object" ? (author as BlogAuthor) : null;
  return a ? `${a.firstName || ""} ${a.lastName || ""}`.trim() || "AOSL Team" : "AOSL Team";
};

export const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

export const readingTime = (html?: string) => {
  const words = plainText(html || "").split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};
