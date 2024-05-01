import { User } from "./user";

export type ChatRoom = {
  id: string;
  name: string;
  members: User[];
  roomImage: { type: String, select: true, default: 'https://aosl-online.com/wp-content/uploads/2024/01/LOGO-W.png' },
  createdAt: Date;
  createdBy: User,
  updatedBy: User,
  deleted: { type: Boolean, default: false, select: false },
}