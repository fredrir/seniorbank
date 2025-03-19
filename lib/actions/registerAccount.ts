"use server";
import { authOptions } from "@/app/api/[auth]/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../db";
import { Difficulty } from "@prisma/client";

interface Props {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  email: string;
  difficulty: string;
}

const registerAccount = async (props: Props) => {
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
    return null;
  }

  //TODO add fixtures

  await prisma.user.create({
    data: {
      name: `${props.firstName} ${props.lastName}`,
      birthDate: props.birthDate,
      phoneNumber: props.phoneNumber,
      address: props.address,
      email: props.email,
      difficulty: props.difficulty as Difficulty,
    },
  });
};

export default registerAccount;
