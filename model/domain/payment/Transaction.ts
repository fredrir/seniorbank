import { OnlyFields } from "@/lib/types";

export type ApprovalStatus = "APPROVED" | "DENIED" | null;

export class Transaction {
  public readonly id?: string | undefined;
  public readonly direction: "OUTBOUND" | "INBOUND";
  public flagged: boolean;
  public held: boolean;
  public approvalStatus: ApprovalStatus;
  public approvalTime: Date | null;
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
    held,
    approvalStatus: outcome,
    approvalTime: outcomeChangedAt,
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
    this.held = held;
    this.flagged = flagged;
    this.approvalStatus = outcome;
    this.approvalTime = outcomeChangedAt;
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
      approvalStatus: null,
      approvalTime: null,
      flagged: false,
      held: false,
      dueDate: new Date(),
    });
  }

  getRevertTransaction() {
    return Transaction.new(this.peerAccountId, this.accountId, this.amount);
  }

  hold() {
    this.held = true;
  }

  flag() {
    this.flagged = true;
  }

  approve() {
    this.held = false;
    this.approvalStatus = "APPROVED";
    this.approvalTime = new Date();
  }

  deny() {
    this.approvalStatus = "DENIED";
    this.approvalTime = new Date();
  }

  isReversible() {
    if (this.dueDate < new Date()) {
      return true;
    }

    if (this.held && this.approvalStatus !== "APPROVED") {
      return true;
    }

    return false;
  }
}

type TransactionData = OnlyFields<Transaction>;
