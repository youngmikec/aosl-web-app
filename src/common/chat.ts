import { ChatRoom } from "./chat-room";
import { User } from "./user";


export type ChatMessage = {
  sender: User,
  recipient: User,
  room: ChatRoom,
  message: string,
  createdAt: Date,
  createdBy: User,
  updatedBy: User,
  deleted: boolean,
  deletedAt: Date,
  deletedBy: User
}