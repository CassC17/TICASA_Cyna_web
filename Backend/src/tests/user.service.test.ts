import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { UserDTO } from "../types/user/user.dto";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../repositories/user.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService();
    (authService as any).userRepository = userRepository;
  });

  it("should register a user", async () => {
    const mockUserDTO = new UserDTO(1, "Dupont", "Jean", "password", "jean@example.com", false, false);
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.createUser.mockResolvedValue(mockUserDTO);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

    const result = await authService.register("Dupont", "Jean", "jean@example.com", "password123");

    expect(result).toEqual(mockUserDTO);
    expect(userRepository.findByEmail).toHaveBeenCalledWith("jean@example.com");
    expect(userRepository.createUser).toHaveBeenCalledWith("Dupont", "Jean", "jean@example.com", "hashedPassword");
  });

  it("should throw an error if email already exists", async () => {
    const existingUser = new UserDTO(1, "Dupont", "Jean", "password", "jean@example.com", false, false);
    userRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(authService.register("Dupont", "Jean", "jean@example.com", "password123"))
      .rejects.toThrow("Email déjà utilisé");
  });

  it("should login a user", async () => {
    const mockUserDTO = new UserDTO(1, "Dupont", "Jean", "password", "jean@example.com", false, false);
    userRepository.findByEmail.mockResolvedValue({ ...mockUserDTO, password: "hashedPassword" });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mockToken");

    const result = await authService.login("jean@example.com", "password123");

    expect(result.token).toBe("mockToken");
    expect(result.user).toEqual(mockUserDTO);
    expect(userRepository.updateUserStatus).toHaveBeenCalledWith(1, true);
  });

  it("should fail login with incorrect password", async () => {
    const mockUserDTO = new UserDTO(1, "Dupont", "Jean", "password", "jean@example.com", false, false);
    userRepository.findByEmail.mockResolvedValue({ ...mockUserDTO, password: "hashedPassword" });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(authService.login("jean@example.com", "wrongpassword"))
      .rejects.toThrow("Email ou mot de passe incorrect");
  });

  it("should logout a user", async () => {
    await authService.logout(1);
    expect(userRepository.updateUserStatus).toHaveBeenCalledWith(1, false);
  });
});
