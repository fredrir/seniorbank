import { BankAccount } from "@/model/domain/payment/BankAccount";
import { DTOMapper } from "@/model/utils/types";
import { z } from "zod";

const schema = z
  .object({
    id: z.string(),
    name: z.string(),
    category: z.string().nullable(),
    userId: z.string().nullable(),
    balance: z.number(),
    main: z.boolean(),
    countryCode: z.string(),
  })
  .strict();

export type JsonBankAccount = z.infer<typeof schema>;

export const JsonBankAccountDTOMapper: DTOMapper<BankAccount, JsonBankAccount> =
  {
    serialize: (object) => ({ ...object }),
    deserialize: (dto) => new BankAccount(schema.parse(dto)),
  };
