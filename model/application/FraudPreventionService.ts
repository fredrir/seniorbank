import { NotificationService } from "./NotificationService";
import { BankAccount } from "../domain/payment/BankAccount";
import { Transaction } from "../domain/payment/Transaction";
import { User } from "../domain/user/User";
import { UserRepository } from "../domain/user/UserRepository";

export class FraudPreventionService {
  constructor(
    private userRepository: UserRepository,
    private notificationService: NotificationService,
  ) {}

  isTransactionSuspicious(transaction: Transaction, peerAccount: BankAccount) {
    return peerAccount.countryCode !== "NO" && transaction.amount > 10_000;
  }

  shouldHoldTransaction(transaction: Transaction, user: User) {
    return transaction.flagged || user.difficulty === "EASY";
  }

  async processTransaction(
    transaction: Transaction,
    account: BankAccount,
    peerAccount: BankAccount,
  ): Promise<{ contactNotified: boolean }> {
    if (this.isTransactionSuspicious(transaction, peerAccount)) {
      transaction.flag();
    }

    const user = (await this.userRepository.get(account.userId!))!;

    if (this.shouldHoldTransaction(transaction, user)) {
      transaction.hold();

      await this.notificationService.sendContactNotification(
        user.id,
        "Ny transaksjon trenger godkjenning!",
      );

      return { contactNotified: true };
    }

    return { contactNotified: false };
  }
}
