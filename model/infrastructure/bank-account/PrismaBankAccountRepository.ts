import {
  BankAccountFilter,
  BankAccountRepository,
  TransactionFilter,
} from "@/model/domain/payment/BankAccountRepository";
import type { PrismaClient } from "@prisma/client";
import { PrismaTransactionDTOMapper } from "./mappers/PrismaTransactionDTOMapper";
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

  async getTransaction(id: string) {
    const dto = await this.prisma.transaction.findUnique({ where: { id } });

    return dto ? PrismaTransactionDTOMapper.deserialize(dto) : null;
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
        approvedAt:
          filter?.approved !== undefined
            ? filter.approved
              ? { not: null }
              : null
            : undefined,
        OR: [
          {
            toAccountId: { in: filter?.accountIds },
            OR: [
              {
                fromAccount: { name: { contains: filter?.query } },
              },
              {
                fromAccount: { category: { contains: filter?.query } },
              },
            ],
          },
          {
            fromAccountId: { in: filter?.accountIds },
            OR: [
              {
                toAccount: { name: { contains: filter?.query } },
              },
              {
                toAccount: { category: { contains: filter?.query } },
              },
            ],
          },
        ],
      },
      take: page?.limit,
      skip: page && page.page && page.limit * page.page,
    });

    const transactions = [];
    for (const transactionDTO of transactionDTOs) {
      if (filter.accountIds.includes(transactionDTO.fromAccountId)) {
        transactions.push(
          PrismaTransactionDTOMapper.deserialize(
            transactionDTO,
            transactionDTO.fromAccountId,
          ),
        );
      }
      if (filter.accountIds.includes(transactionDTO.toAccountId)) {
        transactions.push(
          PrismaTransactionDTOMapper.deserialize(
            transactionDTO,
            transactionDTO.toAccountId,
          ),
        );
      }
    }

    return transactions;
  }
}
