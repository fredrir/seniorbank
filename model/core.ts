import { BankAccountService } from "./application/BankAccountService";
import { DemoDataService } from "./application/DemoDataService";
import { FraudPreventionService } from "./application/FraudPreventionService";
import { UserService } from "./application/UserService";
import { prisma } from "./db";
import { PrismaBankAccountRepository } from "./infrastructure/bank-account/PrismaBankAccountRepository";
import { DummyNotificationService } from "./infrastructure/notification/DummyNotificationService";
import { PrismaUserRepository } from "./infrastructure/user/PrismaUserRepository";

const bankAccountRepository = new PrismaBankAccountRepository(prisma);
const userRepository = new PrismaUserRepository(prisma);

const fraudPreventionService = new FraudPreventionService(
  bankAccountRepository,
);
const notificationService = new DummyNotificationService();
export const bankAccountService = new BankAccountService(
  bankAccountRepository,
  fraudPreventionService,
  notificationService,
);
export const demoDataService = new DemoDataService(bankAccountRepository);
export const userService = new UserService(userRepository, demoDataService);
