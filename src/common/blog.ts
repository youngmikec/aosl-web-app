import { User } from "./user";

enum BlogStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    UNPUBLISHED = 'UNPUBLISHED'
};

enum BlogCategory {
  TRANSPORTATION = 'TRANSPORTATION',
  ACCOMMODATION = 'ACCOMODATION',
  HEALTH = 'HEALTH',
  CONSULTATION = 'CONSULTATION',
  SERVICE = 'SERVICE',
  FOOD = 'FOOD',
  LIFESTYLE = 'LIFESTYLE',
  BUSSINESS = 'BUSINESS',
  FASHION = 'FASHION',
  TRAVEL = 'TRAVEL'
}

export const BLOG_CATEGORIES = {
    TRANSPORTATION: 'TRANSPORTATION',
    ACCOMMODATION: 'ACCOMODATION',
    HEALTH: 'HEALTH',
    CONSULTATION: 'CONSULTATION',
    SERVICE: 'SERVICE',
    FOOD: 'FOOD',
    LIFESTYLE: 'LIFESTYLE',
    BUSSINESS: 'BUSINESS',
    FASHION: 'FASHION',
    TRAVEL: 'TRAVEL'
  }

export type BlogPost = {
    id: string;
    title: string;
    subTitle: string;
    code: string;
    content: string;
    category: BlogCategory;
    author: User;
    status: BlogStatus
    tags: string[];
    slug: string;
    likes: number;
    enableComments: boolean;
    enableCommentReplies: boolean;
    comments: Comment[];
    media: any[];
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    upatedAt: Date;
    deleted: boolean;
    deletedAt: Date;
    deletedBy: User;
  }