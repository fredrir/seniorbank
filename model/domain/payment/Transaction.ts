import { OnlyFields } from "@/lib/types";

export class Transaction {
  public readonly id?: string | undefined;
  public readonly direction: "OUTBOUND" | "INBOUND";
  public flagged: boolean;
  public approvedAt: Date | null;
  public accountId: string;
  public peerAccountId: string;
  public amount: number;
  public dueDate: Date;
  public createdAt?: Date | undefined;

  constructor({
    id,
    direction,
    accountId,
    peerAccountId,
    flagged,
    approvedAt,
    amount,
    dueDate,
    createdAt,
  }: TransactionData) {
    if (amount <= 0) {
      throw new Error(`Cannot create transaction with amount of zero or less`);
    }

    this.id = id;
    this.direction = direction;
    this.accountId = accountId;
    this.peerAccountId = peerAccountId;
    this.flagged = flagged;
    this.approvedAt = approvedAt;
    this.amount = amount;
    this.dueDate = dueDate;
    this.createdAt = createdAt;
  }

  static new(accountId: string, peerAccountId: string, amount: number) {
    return new Transaction({
      accountId,
      peerAccountId,
      amount,
      direction: "OUTBOUND",
      flagged: false,
      approvedAt: null,
      dueDate: new Date(),
    });
  }

  getRevertTransaction() {
    return Transaction.new(this.peerAccountId, this.accountId, this.amount);
  }

  flag() {
    this.flagged = true;
  }

  approve() {
    this.approvedAt = new Date();
  }

  isReversible() {
    if (this.dueDate < new Date()) {
      return true;
    }

    if (this.flagged && !this.approvedAt) {
      return true;
    }

    return false;
  }
}

type TransactionData = OnlyFields<Transaction>;
