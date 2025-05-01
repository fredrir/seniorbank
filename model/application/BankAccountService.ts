import {
  BankAccountFilter,
  BankAccountRepository,
  TransactionFilter,
} from "@/model/domain/payment/BankAccountRepository";
import {
  JsonBankAccountDTOMapper,
  JsonBankAccount,
} from "./mappers/JsonBankAccountDTOMapper";
import { unique } from "@/lib/utils";
import {
  BankAccount,
  PublicBankAccountDetails,
} from "../domain/payment/BankAccount";
import {
  JsonTransaction,
  JsonTransactionDTOMapper,
} from "./mappers/JsonTransactionDTOMapper";
import { FraudPreventionService } from "./FraudPreventionService";
import { Transaction } from "../domain/payment/Transaction";
import { NotificationService } from "../domain/notification/NotificationService";
import { Pagination } from "../utils/types";

export type TransactionListData = {
  transactions: JsonTransaction[];
  peerAccountDetails: PublicBankAccountDetails[];
};

export class BankAccountService {
  constructor(
    private bankAccountRepository: BankAccountRepository,
    private fraudPreventionService: FraudPreventionService,
    private notificationService: NotificationService,
  ) {}

  async get(id: string, userId: string): Promise<JsonBankAccount | null> {
    const bankAccount = await this.bankAccountRepository.get(id);

    if (bankAccount === null) {
      throw new Error(`Could not find bank account ${id}`);
    }

    if (bankAccount.userId !== userId) {
      throw new Error(`User is not authorized to view account ${id}`);
    }

    return JsonBankAccountDTOMapper.serialize(bankAccount);
  }

  async getUserMainAccount(userId: string): Promise<JsonBankAccount> {
    const bankAccount = await this.bankAccountRepository.find({
      userId,
      main: true,
    });

    if (bankAccount === null) {
      throw new Error(
        `Could not find main bank account of user with ID ${userId}`,
      );
    }

    return JsonBankAccountDTOMapper.serialize(bankAccount);
  }

  async list(
    userId: string,
    filter?: BankAccountFilter,
    page?: Pagination,
  ): Promise<BankAccount[]> {
    return await this.bankAccountRepository.list({ ...filter, userId }, page);
  }

  async listHeldTransactions(userId: string): Promise<TransactionListData> {
    const accounts = await this.bankAccountRepository.list({
      userId,
    });

    const transactions = await this.bankAccountRepository.listTransactions({
      flagged: true,
      accountIds: accounts.map((account) => account.id),
    });

    const peerAccountIds = unique(
      transactions.map((transaction) => transaction.peerAccountId),
    );

    const peerAccounts =
      await this.bankAccountRepository.getMany(peerAccountIds);

    return {
      transactions: transactions.map((obj) =>
        JsonTransactionDTOMapper.serialize(obj),
      ),
      peerAccountDetails: peerAccounts.map((peerAccount) =>
        peerAccount.publicDetails(),
      ),
    };
  }

  async listTransactions(
    accountId: string,
    userId: string,
    filter?: TransactionFilter,
    page?: Pagination,
  ): Promise<TransactionListData> {
    // This checks that the user is authorized to access the bank account
    const account = await this.get(accountId, userId);

    if (account === null) {
      throw new Error(`Could not find account with id: ${accountId}`);
    }

    const transactions = await this.bankAccountRepository.listTransactions(
      { ...filter, accountIds: [accountId] },
      page,
    );

    const peerAccountIds = unique(
      transactions.map((transaction) => transaction.peerAccountId),
    );

    const peerAccounts =
      await this.bankAccountRepository.getMany(peerAccountIds);

    return {
      transactions: transactions.map((obj) =>
        JsonTransactionDTOMapper.serialize(obj),
      ),
      peerAccountDetails: peerAccounts.map((peerAccount) =>
        peerAccount.publicDetails(),
      ),
    };
  }

  async createTransaction(
    userId: string,
    accountId: string,
    toAccountId: string,
    amount: number,
  ): Promise<JsonTransaction> {
    const transactionCreate = Transaction.new(accountId, toAccountId, amount);

    const account = await this.bankAccountRepository.get(
      transactionCreate.accountId,
    );
    const peerAccount = await this.bankAccountRepository.get(
      transactionCreate.peerAccountId,
    );

    if (account.userId !== userId) {
      throw new Error("Not authorized to this bank account");
    }

    // This is also enforced by a database constraint
    if (transactionCreate.amount > account.balance) {
      throw new Error(`Insufficient balance on account ${account.id}`);
    }

    const isSuspicious =
      await this.fraudPreventionService.isTransactionSuspicious(
        transactionCreate,
        account,
        peerAccount,
      );

    if (isSuspicious) {
      this.notificationService.sendNotification(
        userId,
        "Transaction marked as suspicious and needs approval!",
      );

      transactionCreate.flag();
    }

    const transaction =
      await this.bankAccountRepository.createTransaction(transactionCreate);

    return JsonTransactionDTOMapper.serialize(transaction);
  }

  async revertTransaction(transactionId: string, userId: string) {
    const transaction =
      await this.bankAccountRepository.getTransaction(transactionId);

    if (transaction === null) {
      throw new Error(`Could not find transaction`);
    }
    const account = await this.bankAccountRepository.get(transaction.accountId);
    if (account === null) {
      throw new Error(`Could not get account`);
    }

    if (account.userId !== userId) {
      throw new Error(`Not authorized to access this account`);
    }

    if (!transaction.isReversible()) {
      throw new Error(`This transaction is not reversible!`);
    }

    await this.bankAccountRepository.createTransaction(
      transaction.getRevertTransaction(),
    );
  }
}
