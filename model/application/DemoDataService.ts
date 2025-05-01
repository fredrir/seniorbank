import { BankAccount } from "@/model/domain/payment/BankAccount";
import { BankAccountRepository } from "@/model/domain/payment/BankAccountRepository";
import { Transaction } from "../domain/payment/Transaction";

const DEMO_USER_ACCOUNTS = [
  { name: "Brukskonto", balance: 18_932.54, main: true },
  { name: "Sparekonto", balance: 830_726 },
  { name: "Barnebarn", balance: 34_835 },
  { name: "Russetid", balance: 10_835 },
];

export class DemoDataService {
  constructor(private bankAccountRepository: BankAccountRepository) {}

  private static randomNDigitNumber(n: number) {
    return String(Math.floor(Math.random() * Math.pow(10, n))).padStart(n, "0");
  }

  static randomBankAccountNumber() {
    return `${this.randomNDigitNumber(4)} ${this.randomNDigitNumber(2)} ${this.randomNDigitNumber(5)}`;
  }

  static randomSparebank1BankAccountNumber() {
    return `1080 ${this.randomNDigitNumber(2)} ${this.randomNDigitNumber(5)}`;
  }

  private async findOrCreateDemoPeerAccount(fields: {
    name: string;
    category: string;
    countryCode: string;
  }) {
    const existingAccount = await this.bankAccountRepository.find(fields);

    if (existingAccount !== null) {
      return existingAccount;
    }

    const newAccount = await this.bankAccountRepository.create(
      new BankAccount({
        ...fields,
        userId: null,
        balance: 0,
        id: DemoDataService.randomBankAccountNumber(),
        main: false,
      }),
    );

    return newAccount;
  }

  async createDemoDataForUser(userId: string) {
    const [mainAccount] = await this.bankAccountRepository.createMany(
      DEMO_USER_ACCOUNTS.map(
        (data) =>
          new BankAccount({
            main: false,
            id: DemoDataService.randomBankAccountNumber(),
            userId,
            category: null,
            countryCode: "NO",
            ...data,
          }),
      ),
    );

    const remaAccount = await this.findOrCreateDemoPeerAccount({
      name: "Rema 1000",
      category: "Dagligvare",
      countryCode: "NO",
    });

    const sitAccount = await this.findOrCreateDemoPeerAccount({
      name: "SIT kantine",
      category: "Kiosk",
      countryCode: "NO",
    });

    const jokerSamfAccount = await this.findOrCreateDemoPeerAccount({
      name: "Joker stud.samf.",
      category: "Dagligvare",
      countryCode: "NO",
    });

    const clippersAccount = await this.findOrCreateDemoPeerAccount({
      name: "Klippers",
      category: "Kosmetikk",
      countryCode: "NO",
    });

    const privatePersonAccount = await this.findOrCreateDemoPeerAccount({
      name: "Navn Navnesen",
      category: "Privatperson",
      countryCode: "NO",
    });

    const transactionDefaults = {
      accountId: mainAccount.id,
      direction: "OUTBOUND" as const,
      flagged: false,
      held: false,
      approvalStatus: null,
      approvalTime: null,
    };

    await this.bankAccountRepository.createManyTransactions(
      [
        {
          peerAccountId: remaAccount.id,
          amount: 826.8,
          dueDate: new Date(2025, 2, 31),
        },
        {
          peerAccountId: sitAccount.id,
          amount: 45.87,
          dueDate: new Date(2025, 2, 31),
        },
        {
          peerAccountId: privatePersonAccount.id,
          amount: 1000,
          dueDate: new Date(2025, 2, 31),
        },
        {
          peerAccountId: jokerSamfAccount.id,
          amount: 72.46,
          dueDate: new Date(2025, 2, 30),
        },
        {
          peerAccountId: clippersAccount.id,
          amount: 599,
          direction: "OUTBOUND" as const,
          dueDate: new Date(2025, 2, 30),
        },
      ].map(
        (transaction) =>
          new Transaction({
            ...transactionDefaults,
            ...transaction,
          }),
      ),
    );
  }
}
