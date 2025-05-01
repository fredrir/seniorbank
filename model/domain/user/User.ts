import { NoExtraProperties, OnlyFields } from "@/lib/types";
import { isEmailInvalid as getEmailValidationError } from "@/model/utils/validation";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type UserData = NoExtraProperties<OnlyFields<User>>;

export class User {
  public id: string;
  public email: string;
  public name: string;
  public birthDate: Date;
  public phoneNumber: string;
  public address: string;
  public paymentDelayDays: number;
  public difficulty: Difficulty;

  constructor({
    email,
    name,
    birthDate,
    phoneNumber,
    address,
    paymentDelayDays,
    difficulty,
    id,
  }: UserData) {
    if (id === "") {
      throw new Error("ID cannot be empty");
    }

    const emailError = getEmailValidationError(email);
    if (emailError) {
      throw new Error(`Invalid email: ${emailError}`);
    }

    this.address = address;
    this.birthDate = birthDate;
    this.difficulty = difficulty;
    this.name = name;
    this.paymentDelayDays = paymentDelayDays;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.id = id;
  }

  setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }

  setPaymentDelayDays(days: number) {
    if (days < 0) {
      throw new Error(`Could not set payment delays to value below 0: ${days}`);
    }

    if (days > 7) {
      throw new Error(`Could not set payment delay to value over 7: ${days}`);
    }

    this.paymentDelayDays = days;
  }
}
