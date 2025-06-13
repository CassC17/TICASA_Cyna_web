import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/user.repository";
import { UserPresenter } from "../types/user/user.presenter";
import { UserDTO } from "../types/user/user.dto";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export class AuthService {
  private userRepository = new UserRepository();

  async login(email: string, password: string): Promise<{ token: string; user: UserDTO }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      const error = new Error("Email ou mot de passe incorrect");
      (error as any).status = 401;
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error("Email ou mot de passe incorrect");
      (error as any).status = 401;
      throw error;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    await this.userRepository.updateUserStatus(user.id, true);

    return { token, user: UserPresenter.toDTO(user) };
  }

  async register(nom: string, prenom: string, email: string, password: string): Promise<UserDTO> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error("Email déjà utilisé");
      (error as any).status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser(nom, prenom, email, hashedPassword);

    return UserPresenter.toDTO(user);
  }
  
  async logout(userId: number): Promise<void> {
    await this.userRepository.updateUserStatus(userId, false);
  }  

  async updateUser(
  userId: number,
  updates: Partial<{ nom: string; prenom: string; email: string; password: string }>
): Promise<UserDTO> {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const user = await this.userRepository.updateUser(userId, updates);
  return UserPresenter.toDTO(user);
}

}
