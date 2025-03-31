"use server";
import { getServerSession } from "@/lib/auth";
import { prisma } from "../lib/db";
import { Difficulty } from "@prisma/client";
import { createFixturesForUser } from "../lib/fixtures";
import { RegisterAccountFormData } from "@/lib/types";

const registerAccount = async (form: RegisterAccountFormData) => {
  try {
    const session = await getServerSession();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: session.email
      },
    });
    if (existingUser) {
      return false;
    }

    if (!["EASY", "MEDIUM", "HARD"].includes(form.difficulty)) {
      return false;
    }

    const user = await prisma.user.create({
      data: {
        name: `${form.firstName} ${form.lastName}`,
        birthDate: `${form.birthDate}T00:00:00.000Z`,
        phoneNumber: form.phoneNumber,
        address: form.address,
        email: session.email,
        difficulty: form.difficulty
      },
    });

    await createFixturesForUser(user.id);

    return true;
  } catch (error) {
    console.error("Error in registering account", error);
    return false;
  }
};

export default registerAccount;
