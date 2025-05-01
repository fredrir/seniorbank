import { Transaction } from "@/model/domain/payment/Transaction";
import { DTOMapper } from "@/model/utils/types";
import { NoExtraProperties } from "@/lib/types";
import { Transaction as PrismaBankAccountTransaction } from "@prisma/client";

export type PrismaTransactionDTO = Omit<
  NoExtraProperties<PrismaBankAccountTransaction>,
  "createdAt" | "id"
> & {
  id?: PrismaBankAccountTransaction["id"];
  createdAt?: PrismaBankAccountTransaction["createdAt"];
};

/**
 * When stored in the database transactions are both inbound and outbound and have a from AccountId and toAccountId,
 * while the domain objects are from the perspective of one specific bank account (identified by accountId)
 * to a peer account (identified by peerAccountId)
 */
export const PrismaTransactionDTOMapper: DTOMapper<
  Transaction,
  PrismaTransactionDTO,
  undefined,
  string
> = {
  deserialize: function (
    {
      fromAccountId,
      toAccountId,
      id,
      amount,
      dueDate,
      createdAt,
      flagged,
      approvedAt,
    }: PrismaTransactionDTO,
    accountId: string,
  ): Transaction {
    const direction = fromAccountId === accountId ? "OUTBOUND" : "INBOUND";
    const peerAccountId =
      accountId === fromAccountId ? toAccountId : fromAccountId;

    return new Transaction({
      id,
      direction,
      accountId,
      peerAccountId,
      flagged,
      approvedAt,
      amount,
      dueDate,
      createdAt,
    });
  },
  serialize({
    amount,
    direction,
    accountId,
    peerAccountId,
    dueDate,
    approvedAt,
    flagged,
    createdAt,
    id,
  }: Transaction): PrismaTransactionDTO {
    const [fromAccountId, toAccountId] =
      direction === "OUTBOUND"
        ? [accountId, peerAccountId]
        : [peerAccountId, accountId];

    return {
      amount,
      dueDate,
      fromAccountId,
      toAccountId,
      createdAt,
      flagged,
      approvedAt,
      id,
    };
  },
};
