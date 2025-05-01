import { User } from "./User";

export interface UserRepository {
  get: (userId: string) => Promise<User | null>;
  getByEmail: (email: string) => Promise<User | null>;
  create: (user: User) => Promise<User>;
  save: (user: User) => Promise<void>;
  isEmailTaken: (email: string) => Promise<boolean>;
}
