import { UserRepository } from "@/model/domain/user/UserRepository";
import { JSONUserDTO, JsonUserDTOMapper } from "./mappers/JsonUserDTOMapper";
import { DemoDataService } from "./DemoDataService";
import { Difficulty } from "../domain/user/User";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private demoDataService: DemoDataService,
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

  async setPaymentDelayDays(id: string, days: number) {
    const user = await this.userRepository.get(id);

    if (user === null) {
      throw new Error(`Could not find user with id ${id}`);
    }

    user.setPaymentDelayDays(days);

    await this.userRepository.save(user);
  }

  async setDifficulty(id: string, difficulty: Difficulty) {
    const user = await this.userRepository.get(id);

    if (user === null) {
      throw new Error(`Could not find user with id ${id}`);
    }

    user.setDifficulty(difficulty);

    await this.userRepository.save(user);
  }
}
