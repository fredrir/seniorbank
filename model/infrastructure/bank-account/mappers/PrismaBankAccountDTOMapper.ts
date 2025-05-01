import { BankAccount } from "@/model/domain/payment/BankAccount";
import { DTOMapper } from "@/model/utils/types";
import { BankAccount as PrismaBankAccount } from "@prisma/client";

export type PrismaBankAccountDTO = PrismaBankAccount;

export const PrismaBankAccountDTOMapper: DTOMapper<
  BankAccount,
  PrismaBankAccountDTO
> = {
  deserialize: (data) => new BankAccount(data),
  serialize: (account) => ({ ...account }),
};
