import http, { url } from "./http";
import type { ApiResponse, BlogComment, BlogPost } from "../models";

export const BLOG_PAGE_SIZE = 9;
const LIST_FIELDS = "title,subTitle,slug,coverImage,category,tags,likes,author,enableComments,createdAt";

// Published posts only (the API enforces this); newest first. `content` is left out of list calls.
export const fetchBlogs = (opts: { skip?: number; limit?: number; category?: string; q?: string } = {}) => {
  const params = new URLSearchParams({
    sort: "-createdAt",
    limit: String(opts.limit ?? BLOG_PAGE_SIZE),
    skip: String(opts.skip ?? 0),
    fields: LIST_FIELDS,
  });
  if (opts.category) params.set("category", opts.category);
  if (opts.q) params.set("q", opts.q);
  return http.get<ApiResponse<BlogPost[]>>(`${url}/blog-posts/public/?${params.toString()}`);
};

export const fetchBlogBySlug = (slug: string) =>
  http.get<ApiResponse<BlogPost[]>>(`${url}/blog-posts/public/?slug=${encodeURIComponent(slug)}&limit=1`);

export const likeBlog = (blogId: string, type: "increase" | "decrease") =>
  http.post<ApiResponse<BlogPost>>(`${url}/blog-posts/public/like-blog`, { blogId, like: 1, type });

export const fetchBlogComments = (blogId: string, skip = 0, limit = 10) =>
  http.get<ApiResponse<BlogComment[]>>(`${url}/comments/public/byBlogId/${blogId}?limit=${limit}&skip=${skip}`);

export const postBlogComment = (data: {
  blog: string;
  content: string;
  isGuest: boolean;
  commenterName?: string;
  commenterEmail?: string;
  user?: string;
}) => http.post<ApiResponse<BlogComment>>(`${url}/comments/public`, data);
