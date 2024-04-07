import { User } from "./user";

export enum JobType {
  WORK = "WORK",
  TRAINING = "TRAINING",
}

export enum JobStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export enum JobWorkMode {
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
  ONSITE = 'ONSITE',
  FULLTIME = 'FULLTIME',
  PART_TIME = 'PART_TIME'
}

export enum JobPaymentMethod {
  NONE = 'NONE',
  BANK = 'BANK',
  PAYPAL = 'PAYPAL',
}

export enum JobPaymentDuration {
  NONE = 'NONE',
  MONTHLY = 'MONTHLY',
  HOURLY = 'HOURLY',
  WEEKLY = 'WEEKLY',
  ANNUALY = 'ANNUALY'
}

export type Job = {
  id: string;
  code: string;
  title: string;
  description: string;
  renumeration: string;
  jobImage: string | any;
  workMode: JobWorkMode;
  type: JobType;
  status: JobStatus;
  jobRequirements: string[];
  companyName: string;
  termDuration: string;
  paymentDuration: JobPaymentDuration;
  paymentMethod: JobPaymentMethod;
  createdBy: User;
  createdAt: Date;
  updatedBy: User;
  upatedAt: Date;
  deleted: boolean;
  deletedAt: Date;
  deletedBy: User;
}