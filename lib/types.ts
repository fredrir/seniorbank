import { Difficulty } from "@prisma/client";

export type tParams = Promise<{ id: string }>;

export type RegisterAccountFormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  difficulty: Difficulty;
};

export type PaymentFormData = {
  comment: string;
  amount: string;
  toAccount: string;
  fromAccount: string;
};

/**
 * Disallows passing extra properties to a type.
 * Useful for catching problems caused by changing generated types
 * @template T - The class to convert
 */
export type NoExtraProperties<T, U extends T = T> = U &
  Record<Exclude<keyof U, keyof T>, never>;

/**
 * Returns a data type from a class excluding methods.
 * Useful for creating DTOs from domain classes
 * @template T - The class to convert
 */
export type OnlyFields<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export type MessageType = {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  borderColor: string;
};
