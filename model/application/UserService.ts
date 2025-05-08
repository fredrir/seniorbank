import { JSONUserDTO, JsonUserDTOMapper } from "./mappers/JsonUserDTOMapper";
import { DemoDataService } from "./DemoDataService";
import { Difficulty } from "../domain/user/User";
import { NotificationService } from "./NotificationService";
import { UserRepository } from "../domain/user/UserRepository";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private demoDataService: DemoDataService,
    private notificationService: NotificationService,
  ) {}

  async register(userCreateDTO: JSONUserDTO) {
    const userCreate = JsonUserDTOMapper.deserialize(userCreateDTO);

    if (await this.userRepository.isEmailTaken(userCreate.email)) {
      throw new Error("This email is already in use!");
    }

    const user = await this.userRepository.create(userCreate);

    await this.demoDataService.createDemoDataForUser(user.id!);

    return JsonUserDTOMapper.serialize(user);
  }

  async get(id: string) {
    const user = await this.userRepository.get(id);

    return user ? JsonUserDTOMapper.serialize(user) : null;
  }

  async setPaymentDelayDays(userId: string, days: number) {
    const user = await this.userRepository.get(userId);

    if (user === null) {
      throw new Error(`Could not find user with id ${userId}`);
    }

    user.setPaymentDelayDays(days);

    await this.notificationService.sendContactNotification(
      userId,
      `Bruker har oppdatert sitt sikkerhetsnivå!`,
    );

    await this.userRepository.save(user);
  }

  async setDifficulty(userId: string, difficulty: Difficulty) {
    const user = await this.userRepository.get(userId);

    if (user === null) {
      throw new Error(`Could not find user with id ${userId}`);
    }

    await this.notificationService.sendContactNotification(
      userId,
      `Bruker har endret dager utsettelse på betalinger`,
    );

    user.setDifficulty(difficulty);

    await this.userRepository.save(user);
  }
}
