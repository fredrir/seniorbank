import {
  BankAccountFilter,
  BankAccountRepository,
  TransactionFilter,
} from "@/model/domain/payment/BankAccountRepository";
import type { PrismaClient } from "@prisma/client";
import {
  PrismaTransactionDTO,
  PrismaTransactionDTOMapper,
} from "./mappers/PrismaTransactionDTOMapper";
import { PrismaBankAccountDTOMapper } from "./mappers/PrismaBankAccountDTOMapper";
import { Pagination } from "@/model/utils/types";
import { BankAccount } from "@/model/domain/payment/BankAccount";
import { Transaction } from "@/model/domain/payment/Transaction";

export class PrismaBankAccountRepository implements BankAccountRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async get(id: string) {
    const accountDTO = await this.prisma.bankAccount.findUnique({
      where: { id },
    });

    if (accountDTO === null) {
      throw new Error(`Could not find bank account with id ${id}`);
    }

    return PrismaBankAccountDTOMapper.deserialize(accountDTO);
  }

  async changeBalance(id: string, amount: number) {
    await this.prisma.bankAccount.update({
      where: { id },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
  }

  async getMany(ids: string[]) {
    const accountDTOs = await this.prisma.bankAccount.findMany({
      where: { id: { in: ids } },
    });

    if (ids.length < accountDTOs.length) {
      const unmatchedIds = ids
        .filter((id) => !accountDTOs.some((account) => id === account.id))
        .join(", ");

      throw new Error(`Could not find accounts with id: ${unmatchedIds}`);
    }

    return accountDTOs.map((dto) =>
      PrismaBankAccountDTOMapper.deserialize(dto),
    );
  }

  async list(filter?: BankAccountFilter, page?: Pagination) {
    const accountDTOs = await this.prisma.bankAccount.findMany({
      where: filter,
      take: page?.limit,
      skip: page && page.page && page.page * page.limit,
    });
    console.log(
      filter,
      accountDTOs.map((a) => a.id),
    );

    return accountDTOs.map((dto) =>
      PrismaBankAccountDTOMapper.deserialize(dto),
    );
  }

  async find(filter: BankAccountFilter) {
    const results = await this.list(filter, { limit: 1 });

    return results.length === 1 ? results[0] : null;
  }

  async createMany(accounts: BankAccount[]) {
    const createdAccountDTOs =
      await this.prisma.bankAccount.createManyAndReturn({
        data: accounts.map((account) =>
          PrismaBankAccountDTOMapper.serialize(account),
        ),
      });

    return createdAccountDTOs.map((dto) =>
      PrismaBankAccountDTOMapper.deserialize(dto),
    );
  }

  async create(account: BankAccount) {
    const createdAccountDTO = await this.prisma.bankAccount.create({
      data: PrismaBankAccountDTOMapper.serialize(account),
    });

    return PrismaBankAccountDTOMapper.deserialize(createdAccountDTO);
  }

  async save(account: BankAccount) {
    await this.prisma.bankAccount.update({
      where: {
        id: account.id,
      },
      data: PrismaBankAccountDTOMapper.serialize(account),
    });
  }

  async getTransaction(id: string, accountId: string) {
    const dto = await this.prisma.transaction.findUnique({
      where: {
        id,
        OR: [{ fromAccountId: accountId }, { toAccountId: accountId }],
      },
    });

    if (dto === null) {
      throw new Error(`Could not get transaction with id ${id}`);
    }

    return PrismaTransactionDTOMapper.deserialize(dto, accountId);
  }

  async createManyTransactions(transactions: Transaction[]) {
    const transactionDTOs = await this.prisma.transaction.createManyAndReturn({
      data: transactions.map((transaction) =>
        PrismaTransactionDTOMapper.serialize(transaction),
      ),
    });

    return transactionDTOs.map((transactionDTO, i) =>
      PrismaTransactionDTOMapper.deserialize(
        transactionDTO,
        transactions[i].accountId,
      ),
    );
  }

  async saveTransaction(transaction: Transaction) {
    await this.prisma.transaction.update({
      data: PrismaTransactionDTOMapper.serialize(transaction),
      where: { id: transaction.id },
    });
  }

  async createTransaction(transaction: Transaction) {
    const [transactionDTO] = await this.prisma.$transaction([
      this.prisma.transaction.create({
        data: PrismaTransactionDTOMapper.serialize(transaction),
      }),
      this.prisma.bankAccount.update({
        where: { id: transaction.peerAccountId },
        data: { balance: { increment: transaction.amount } },
      }),
      this.prisma.bankAccount.update({
        where: { id: transaction.accountId },
        data: { balance: { decrement: transaction.amount } },
      }),
    ]);

    return PrismaTransactionDTOMapper.deserialize(
      transactionDTO,
      transaction.accountId,
    );
  }

  async listTransactions(filter: TransactionFilter, page?: Pagination) {
    const transactionDTOs = await this.prisma.transaction.findMany({
      where: {
        flagged: filter?.flagged,
        held: filter.held,
        OR: [
          {
            fromAccountId: { in: filter.accountIds },
          },
          {
            toAccountId: { in: filter.accountIds },
          },
        ],
        approvalStatus: filter?.checked
          ? {
              not: null,
            }
          : undefined,
      },
      orderBy: { dueDate: "desc" },
      take: page?.limit,
      skip: page && page.page && page.limit * page.page,
    });

    return this.deserializeTransactionArray(transactionDTOs, filter.accountIds);
  }

  private deserializeTransactionArray(
    dtos: PrismaTransactionDTO[],
    accountId: string | string[],
  ) {
    const accountIds = Array.isArray(accountId) ? accountId : [accountId];

    const transactions = [];
    for (const dto of dtos) {
      if (accountIds.includes(dto.fromAccountId)) {
        transactions.push(
          PrismaTransactionDTOMapper.deserialize(dto, dto.fromAccountId),
        );
      }
      if (accountIds.includes(dto.toAccountId)) {
        transactions.push(
          PrismaTransactionDTOMapper.deserialize(dto, dto.toAccountId),
        );
      }
    }

    return transactions;
  }
}
