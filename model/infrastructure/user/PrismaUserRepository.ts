import { User } from "@/model/domain/user/User";
import { UserRepository } from "@/model/domain/user/UserRepository";
import { PrismaClient, Prisma } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async get(id: string) {
    const userDTO = await this.prisma.user.findUnique({
      where: { id },
    });

    return userDTO === null ? null : new User(userDTO);
  }

  async getByEmail(email: string) {
    const userDTO = await this.prisma.user.findUnique({ where: { email } });

    return userDTO === null ? null : new User(userDTO);
  }

  async create(user: User) {
    const userCreateData: Prisma.UserCreateInput = {
      address: user.address,
      birthDate: user.birthDate,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      difficulty: user.difficulty,
      paymentDelayDays: user.paymentDelayDays,
      id: user.id,
    };

    const userDTO = await this.prisma.user.create({
      data: userCreateData,
    });

    return new User(userDTO);
  }

  async save(user: User) {
    if (user.id === null) {
      throw new Error("Could not save user without an id");
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        address: user.address,
        birthDate: user.birthDate,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        difficulty: user.difficulty,
        paymentDelayDays: user.paymentDelayDays,
      },
    });
  }

  async isEmailTaken(email: string) {
    const match = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return match !== null;
  }
}
