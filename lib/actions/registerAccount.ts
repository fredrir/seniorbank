"use server";
import { authOptions } from "@/app/api/[auth]/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../db";
import { Difficulty } from "@prisma/client";
import { createFixturesForUser } from "../fixtures";

interface Props {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  email: string;
  difficulty: string;
}

const registerAccount = async ({
  firstName,
  lastName,
  birthDate,
  phoneNumber,
  address,
  email,
  difficulty,
}: Props) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return false;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
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
        email,
        hasRegistered: true,
        difficulty: difficulty as Difficulty,
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
