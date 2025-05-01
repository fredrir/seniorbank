import { User } from "@/model/domain/user/User";
import { DTOMapper } from "@/model/utils/types";
import type { User as PrismaUser } from "@prisma/client";

export type PrismaUserDTO = PrismaUser;

export const PrismaUserDTOMapper: DTOMapper<User, PrismaUserDTO> = {
  serialize: (user: User) => ({ ...user }),
  deserialize: (data) => new User(data),
};
