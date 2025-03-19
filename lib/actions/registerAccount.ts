"use server";
import { authOptions } from "@/app/api/[auth]/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../db";
import { Difficulty } from "@prisma/client";
import toast from "react-hot-toast";

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
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (user) {
    toast.error("Brukeren eksisterer allerede");
    return null;
  }

  if (
    difficulty !== "EASY" &&
    difficulty !== "MEDIUM" &&
    difficulty !== "HARD"
  ) {
    toast.error("Vanskelighetsgraden er ugyldig");
    return null;
  }

  //TODO add fixtures

  await prisma.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      birthDate: birthDate,
      phoneNumber: phoneNumber,
      address: address,
      email: email,
      difficulty: difficulty as Difficulty,
    },
  });

  toast.success("Brukeren er opprettet!");
  return;
};

export default registerAccount;
