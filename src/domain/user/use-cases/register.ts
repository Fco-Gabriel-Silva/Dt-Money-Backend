import { UserTypeormRepository } from "../../../infra/database/typeorm/dt-money/repositories/user.repository";
import { CreateUserParams } from "../repositoryInterface/user-repository.interface";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthReponse } from "../interfaces/authResponse";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { CategoryTypeormRepository } from "../../../infra/database/typeorm/dt-money/repositories/category.repository";

export class RegisterUseCase {
  private authRepository: UserTypeormRepository;
  private categoryRepository: CategoryTypeormRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.categoryRepository = new CategoryTypeormRepository();
  }

  async execute(user: CreateUserParams): Promise<AuthReponse> {
    const userAlredyExists = await this.authRepository.findByEmail(user.email);

    if (userAlredyExists) {
      throw new UnauthenticatedError("O E-mail já está cadastrado!");
    }

    const encryptedPassword = hashSync(user.password, 10);

    const userCreated = await this.authRepository.createUser({
      ...user,
      password: encryptedPassword,
    });

    const defaultCategories = [
      { name: "Casa", color: "#8257E5" },
      { name: "Academia", color: "#F75A68" },
      { name: "Saúde", color: "#00B37E" },
      { name: "Aluguel", color: "#5A86F7" },
      { name: "Trabalho", color: "#FBA94C" },
      { name: "Freelance", color: "#E1E1E6" },
      { name: "Emergência", color: "#FF71AE" },
      { name: "Reforma", color: "#EBA417" },
    ];
    for (const category of defaultCategories) {
      await this.categoryRepository.createCategory({
        name: category.name,
        color: category.color,
        userId: userCreated.id,
      });
    }

    const token = sign(
      {
        id: userCreated.id,
        email: userCreated.email,
      },
      process.env.APP_SCRETET_KEY,
      {
        expiresIn: "365d",
        algorithm: "HS256",
      },
    );

    delete userCreated.password;

    return {
      token,
      user: userCreated,
    };
  }
}
