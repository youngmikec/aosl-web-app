import { BlogPost } from "./blog";
import { User } from "./user";

export type Comment = {
    id: string;
    code: string;
    isGuest: boolean;
    commenterName: string;
    commenterEmail: string;
    content: string;
    blog: BlogPost;
    author: User;
    isApproved: boolean;
    replies: Comment[]
    likes: number;
    user: User;
    createdBy: User;
    createdAt: Date;
    updatedBy: User;
    upatedAt: Date;
    deleted: boolean;
    deletedAt: Date;
    deletedBy: User;
}