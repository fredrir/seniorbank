import { User } from "@/model/domain/user/User";
import { DTOMapper } from "@/model/utils/types";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  birthDate: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  paymentDelayDays: z.number(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});

export type JSONUserDTO = z.infer<typeof schema>;

export const JsonUserDTOMapper: DTOMapper<User, JSONUserDTO> = {
  serialize: ({ birthDate, ...userRest }) => ({
    birthDate: birthDate.toISOString(),
    ...userRest,
  }),

  deserialize: (dto) => {
    const { birthDate, ...dtoRest } = schema.parse(dto);
    return new User({ ...dtoRest, birthDate: new Date(birthDate) });
  },
};
