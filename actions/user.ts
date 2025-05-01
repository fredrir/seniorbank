"use server";

import { getSession, getUnregisteredSession } from "@/lib/auth";
import { userService } from "@/model/core";
import type { RegisterAccountFormData } from "@/lib/types";
import { Difficulty } from "@/model/domain/user/User";

export async function register({
  firstName,
  lastName,
  birthDate,
  address,
  difficulty,
  phoneNumber,
}: RegisterAccountFormData) {
  const session = await getUnregisteredSession();

  try {
    await userService.register({
      address,
      birthDate,
      difficulty,
      phoneNumber,
      paymentDelayDays: 3,
      id: session.userId,
      name: `${firstName} ${lastName}`,
      email: session.email,
    });
  } catch (err) {
    return err;
  }
}

export async function setDifficulty(difficulty: Difficulty) {
  const session = await getSession();

  try {
    await userService.setDifficulty(session.user.id, difficulty);
  } catch (err) {
    return err;
  }
}

export async function setPaymentDelayDays(days: number) {
  const session = await getSession();

  try {
    await userService.setPaymentDelayDays(session.user.id, days);
  } catch (err) {
    return err;
  }
}

export default register;
