export * from "./airtime";
export * from "./bank";
export * from "./enums";
export * from "./mail";
export * from "./order";
export * from "./user";
export * from "./giftcard";
export * from "./job";
export * from './chat';
export * from './chat-room';
export * from "./cryptocurrency";

export type Step = {
  title: string;
  isActive: boolean;
};

export type ApiResponse = {
  success: boolean;
  message: string;
  payload: any;
};

export type Review = {
  fullName: string;
  stars: number;
  review: string;
};
