"use server";
import { getServerSession } from "@/lib/auth";
import { prisma } from "../lib/db";
import { Difficulty } from "@prisma/client";
import { createFixturesForUser } from "../lib/fixtures";

interface Props {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  difficulty: Difficulty;
}

const registerAccount = async ({
  firstName,
  lastName,
  birthDate,
  phoneNumber,
  address,
  difficulty,
}: Props) => {
  try {
    const session = await getServerSession();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: session.email,
      },
    });
    if (existingUser) {
      return false;
    }

    if (!["EASY", "MEDIUM", "HARD"].includes(difficulty)) {
      return false;
    }

    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        birthDate: `${birthDate}T00:00:00.000Z`,
        phoneNumber,
        address,
        email: session.email,
        hasRegistered: true,
        difficulty,
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
