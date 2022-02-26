import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    console.log(user_id);

    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exist");
    }

    const isUserAdmin = user.admin === true;

    if (!isUserAdmin) {
      throw new Error("User is not an admin");
    }

    const allUsers = this.usersRepository.list();

    return allUsers;
  }
}

export { ListAllUsersUseCase };
