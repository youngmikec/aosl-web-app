import type { V2Application, V2Job, V2Order } from "./index";
import { jobToListing, timeAgo } from "./listing";

export type DashboardJob = {
  id: string;
  title: string;
  company: string;
  type: "Work" | "Training";
  location: string;
  posted: string;
  salary: string;
  description: string;
  requirements: string[];
  contract: string;
  duration?: string;
};

export type ApplicationRow = {
  code: string;
  role: string;
  submitted: string;
  status: string;
  stage: string;
};

export type OrderRow = {
  id: string;
  date: string;
  type: string;
  item: string;
  amount: string;
  amountValue: number;
  status: string;
};

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";

export function toDashboardJob(job: V2Job): DashboardJob {
  const listing = jobToListing(job);
  return {
    id: job.id,
    title: listing.title,
    company: listing.org,
    type: listing.type === "training" ? "Training" : "Work",
    location: listing.location,
    posted: formatDate(job.createdAt),
    salary: listing.rate,
    description: listing.description,
    requirements: listing.skills,
    contract: listing.contract,
    duration: listing.duration,
  };
}

const APPLICATION_STATUS: Record<string, { status: string; stage: string }> = {
  APPLIED: { status: "Submitted", stage: "Awaiting review" },
  REVIEW: { status: "In review", stage: "Application review" },
  ACCEPTED: { status: "Accepted", stage: "Offer / enrolment confirmed" },
  DECLINED: { status: "Declined", stage: "Not progressed" },
};

export function toApplicationRow(app: V2Application): ApplicationRow {
  const mapped = APPLICATION_STATUS[app.status || "APPLIED"] || APPLICATION_STATUS.APPLIED;
  return {
    code: app.code || app.id.slice(-8).toUpperCase(),
    role: app.role,
    submitted: formatDate(app.createdAt),
    status: mapped.status,
    stage: mapped.stage,
  };
}

const ORDER_STATUS_LABEL: Record<string, string> = {
  PAID: "Paid",
  SUCCESS: "Paid",
  COMPLETED: "Completed",
  PENDING: "Pending",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
};

export function toOrderRow(order: V2Order): OrderRow {
  const item = (order as { productService?: { title?: string } }).productService?.title;
  const raw = (order.status || "PENDING").toUpperCase();
  const amount = order.amount || 0;
  return {
    id: order.code || (order as { orderCode?: string }).orderCode || order.id.slice(-8).toUpperCase(),
    date: formatDate(order.createdAt),
    type: "Service",
    item: item || "AOSL service order",
    amount: `£${amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    amountValue: amount,
    status: ORDER_STATUS_LABEL[raw] || raw.charAt(0) + raw.slice(1).toLowerCase(),
  };
}

export const notificationTime = timeAgo;
