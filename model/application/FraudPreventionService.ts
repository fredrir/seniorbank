import { BankAccount } from "../domain/payment/BankAccount";
import { BankAccountRepository } from "../domain/payment/BankAccountRepository";
import { Transaction } from "../domain/payment/Transaction";

export class FraudPreventionService {
  constructor(private bankAccountRepository: BankAccountRepository) {}

  async isTransactionSuspicious(
    transaction: Transaction,
    account: BankAccount,
    peerAccount: BankAccount,
  ): Promise<boolean> {
    if (peerAccount.countryCode !== "NO" && transaction.amount > 10_000) {
      return true;
    }

    return false;
  }
}
