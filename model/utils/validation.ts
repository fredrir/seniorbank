import { z } from "zod";

export const isEmailInvalid = (email: string) =>
  z.string().email().safeParse(email).error;
