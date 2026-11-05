export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  payload: T;
  metadata?: { total: number; limit: number; count: number; skip: number; page: number };
};

export type V2User = {
  id: string;
  code?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  profileImage?: string;
  userType?: "USER" | "ADMIN";
  isVerified?: boolean;
  createdAt?: string;
};

export type V2LoginPayload = { token: string; user: V2User };

export type V2Job = {
  id: string;
  code?: string;
  title: string;
  description?: string;
  companyName?: string;
  type?: string;
  workMode?: string;
  renumeration?: number;
  termDuration?: string;
  paymentDuration?: string;
  paymentMethod?: string;
  jobRequirements?: string[];
  jobImage?: string;
  createdAt?: string;
};

export type V2Application = {
  id: string;
  code?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  nationality: string;
  certLevel: string;
  address: string;
  role: string;
  biography?: string;
  resume?: string;
  skills?: string;
  experienceYears: number;
  job: string | V2Job;
  status?: string;
  createdAt?: string;
};

export type V2ContactMessage = {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

export type V2Order = {
  id: string;
  code?: string;
  status?: string;
  amount?: number;
  currency?: string;
  createdAt?: string;
};

export type ChatPerson = {
  id: string;
  firstName?: string;
  lastName?: string;
  userType?: string;
  profileImage?: string;
};

// The customer's single conversation with AOSL support.
export type SupportRoom = {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unread: number;
};

export type ChatMessage = {
  id: string;
  room: string;
  sender: ChatPerson | string;
  message: string;
  readBy?: string[];
  createdAt: string;
  // Client-only state for messages the server has not confirmed yet.
  tempId?: string;
  pending?: boolean;
  failed?: boolean;
};

export type BlogAuthor = { id: string; firstName?: string; lastName?: string; profileImage?: string };

export type BlogPost = {
  id: string;
  title: string;
  subTitle?: string;
  slug: string;
  coverImage: string;
  category: string;
  tags?: string[];
  likes?: number;
  author?: BlogAuthor | string;
  content?: string;
  enableComments?: boolean;
  createdAt?: string;
};

export type BlogComment = {
  id: string;
  commenterName?: string;
  content: string;
  likes?: number;
  isGuest?: boolean;
  createdAt?: string;
};
