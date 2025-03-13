import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserDTO } from "../types/user/user.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/user.presenter";
import { RegisterInput, LoginInput } from "../types/user/user.input";

const authService = new AuthService();

export const login = async (req: Request, res: Response, next: Function): Promise<void> => {
  try {
    const loginInput = plainToInstance(LoginInput, req.body, {
      excludeExtraneousValues: true,
    });

    const dtoErrors = await validate(loginInput);
    if (dtoErrors.length > 0) {
      res.status(400).json({ errors: dtoErrors });
      return;
    }

    const result = await authService.login(loginInput.email, loginInput.password);
    const formattedUser = plainToInstance(UserPresenter, result.user, {
      excludeExtraneousValues: true,
    });

    res.status(200).json({ token: result.token, user: formattedUser });
    return;
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: Function): Promise<void> => {
  try {
    const registerInput = plainToInstance(RegisterInput, req.body, {
      excludeExtraneousValues: true,
    });

    const dtoErrors = await validate(registerInput);
    if (dtoErrors.length > 0) {
      const formattedErrors = dtoErrors.map(error => ({
        field: error.property,
        errors: Object.values(error.constraints || {}),
      }));

      res.status(400).json({ errors: formattedErrors });
      return;
    }

    const user = await authService.register(
      registerInput.nom,
      registerInput.prenom,
      registerInput.email,
      registerInput.password
    );

    res.status(201).json({
      message: "Utilisateur enregistré",
      user: UserPresenter.toDTO(user),
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: Function): Promise<void> => {
  try {
    const userId = (req as unknown as { user: { id: number } }).user.id;
    await authService.logout(userId);
    res.status(200).json({ message: "User logged out successfully" });
    return;
  } catch (error) {
    next(error);
  }
};