import { Transaction } from "@/model/domain/payment/Transaction";
import { DTOMapper } from "@/model/utils/types";
import { z } from "zod";

const schema = z
  .object({
    id: z.string().optional(),
    direction: z.enum(["OUTBOUND", "INBOUND"]),
    approvedAt: z.string().datetime().optional(),
    flagged: z.boolean(),
    accountId: z.string(),
    peerAccountId: z.string(),
    amount: z.number(),
    dueDate: z.string().date(),
    createdAt: z.string().datetime().optional(),
    isReversible: z.boolean().optional(),
  })
  .strict();

export type JsonTransaction = z.infer<typeof schema>;

export const JsonTransactionDTOMapper: DTOMapper<Transaction, JsonTransaction> =
  {
    serialize: (transaction) => ({
      ...transaction,
      createdAt: transaction.createdAt?.toISOString(),
      approvedAt: transaction.approvedAt?.toISOString(),
      dueDate: transaction.dueDate.toISOString(),
      isReversible: transaction.isReversible(),
    }),
    deserialize: (dto) => {
      const { dueDate, approvedAt, createdAt, ...data } = schema.parse(dto);

      return new Transaction({
        ...data,
        dueDate: new Date(dueDate),
        createdAt: createdAt ? new Date(createdAt) : undefined,
        approvedAt: approvedAt ? new Date(approvedAt) : null,
      });
    },
  };
