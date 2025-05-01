import { Transaction } from "@/model/domain/payment/Transaction";
import { DTOMapper } from "@/model/utils/types";
import { z } from "zod";

const schema = z
  .object({
    id: z.string().optional(),
    direction: z.enum(["OUTBOUND", "INBOUND"]),
    approvalStatus: z.enum(["APPROVED", "DENIED"]).nullable(),
    approvalTime: z.string().datetime().nullable(),
    flagged: z.boolean(),
    held: z.boolean(),
    accountId: z.string(),
    peerAccountId: z.string(),
    amount: z.number(),
    dueDate: z.string().date(),
    isReversible: z.boolean().optional(),
  })
  .strict();

export type JsonTransaction = z.infer<typeof schema>;

export const JsonTransactionDTOMapper: DTOMapper<Transaction, JsonTransaction> =
  {
    serialize: (transaction) => ({
      ...transaction,
      approvalTime: transaction.approvalTime?.toISOString() ?? null,
      dueDate: transaction.dueDate.toISOString(),
      isReversible: transaction.isReversible(),
    }),
    deserialize: (dto) => {
      const { dueDate, approvalTime, ...data } = schema.parse(dto);

      return new Transaction({
        ...data,
        dueDate: new Date(dueDate),
        approvalTime: approvalTime ? new Date(approvalTime) : null,
      });
    },
  };
