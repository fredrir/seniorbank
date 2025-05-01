import type { DefaultSession } from "next-auth";
import type { JSONUserDTO } from "@/model/application/mappers/JsonUserDTOMapper";

declare module "next-auth" {
  interface Session extends DefaultSession {
    userId: string;
    email: string;
    user: JSONUserDTO | null;
    isRegistered: boolean;
  }
}

export interface RegisteredSession extends Session {
  user: JSONUserDTO;
}
