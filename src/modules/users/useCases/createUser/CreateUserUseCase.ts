import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ name, email }: IRequest): User {
    const userEmailExists = this.usersRepository.findByEmail(email);

    if (!userEmailExists) {
      const user = this.usersRepository.create({ name, email });
      return user;
    } else {
      throw new Error('User already exists');
    }
  }
}

export { CreateUserUseCase };
