export * from "./bank";
export * from "./enums";
export * from "./mail";
export * from "./order";
export * from "./user";
export * from "./job";
export * from './chat';
export * from './chat-room';
export * from './application';
export * from './blog';
export * from './comment';

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
