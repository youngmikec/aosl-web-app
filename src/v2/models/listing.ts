import type { V2Job } from "./index";

export type ListingTab = "jobs" | "training";

// UI shape used by the Jobs & Training screens. Built from the API's Job record by jobToListing.
export interface Listing {
  id: string;
  type: ListingTab;
  title: string;
  org: string;
  location: string;
  contract: string;
  level: string;
  rate: string;
  posted: string;
  tags: string[];
  excerpt: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  duration?: string;
  startDate?: string;
  accredited?: boolean;
}

const WORK_MODE_LABELS: Record<string, string> = {
  FULLTIME: "Full-time",
  PART_TIME: "Part-time",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

const PAYMENT_SUFFIX: Record<string, string> = {
  HOURLY: "/hr",
  WEEKLY: "/week",
  MONTHLY: "/month",
  ANNUALY: "/year",
};

function formatRate(job: V2Job): string {
  if (!job.renumeration) return "Rate on application";
  const amount = `£${job.renumeration.toLocaleString("en-GB")}`;
  if (job.type === "TRAINING") return `${amount} / course`;
  return `${amount}${PAYMENT_SUFFIX[job.paymentDuration || ""] || ""}`;
}

export function timeAgo(iso?: string): string {
  if (!iso) return "";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export function jobToListing(job: V2Job): Listing {
  const type: ListingTab = job.type === "TRAINING" ? "training" : "jobs";
  const contract = WORK_MODE_LABELS[job.workMode || ""] || "";
  const description = job.description || "";
  const excerpt = description.length > 140 ? `${description.slice(0, 137).trimEnd()}…` : description;

  return {
    id: job.id,
    type,
    title: job.title,
    org: job.companyName || "AOSL",
    location: "United Kingdom",
    contract,
    level: "",
    rate: formatRate(job),
    posted: timeAgo(job.createdAt),
    tags: [contract, ...(type === "training" && job.termDuration ? [job.termDuration] : [])].filter(Boolean),
    excerpt,
    description,
    responsibilities: [],
    skills: job.jobRequirements || [],
    duration: type === "training" ? job.termDuration : undefined,
  };
}
