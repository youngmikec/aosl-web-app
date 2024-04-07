import { Job } from "./job";
import { User } from "./user";

export enum CertLevel {
  MSC = 'MSC',
  PHD = 'PHD',
  HIGHSCHOOL = 'HIGHSCHOOL',
  BSC = 'BSC',
  DEGREE = 'DEGREE',
  DOCTORATE = 'DOCTORATE'
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  ACCEPTED = 'ACCEPTED',
  REVIEW = 'REVIEW',
  DECLINED = 'DECLINED'
}
export type Application = {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  nationality: string;
  address: string;
  biography: string;
  resume: string;
  certLevel: CertLevel;
  role: string;
  experienceYears: number;
  skills: string;
  job: Job;
  status: ApplicationStatus
  createdBy: User;
  createdAt: Date;
  updatedBy: User;
  upatedAt: Date;
  deleted: boolean;
  deletedAt: Date;
  deletedBy: User;
}