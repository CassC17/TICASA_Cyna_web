import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../types/user/user.entity";

const prisma = new PrismaClient();

export class UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return new UserEntity(
      user.id,
      user.nom,
      user.prenom,
      user.email,
      user.password,
      user.isAdmin,
      user.isLoggedIn
    );
  }

  async createUser(nom: string, prenom: string, email: string, password: string): Promise<UserEntity> {
    const user = await prisma.user.create({
      data: { nom, prenom, email, password },
    });

    return new UserEntity(
      user.id,
      user.nom,
      user.prenom,
      user.email,
      user.password,
      user.isAdmin,
      user.isLoggedIn
    );
  }

  async updateUserStatus(userId: number, isLoggedIn: boolean): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { isLoggedIn },
    });
  }

  async findById(userId: number): Promise<UserEntity | null> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return null;

  return new UserEntity(
    user.id,
    user.nom,
    user.prenom,
    user.email,
    user.password,
    user.isAdmin,
    user.isLoggedIn
  );
}

async updateUser(
  userId: number,
  data: Partial<{ nom: string; prenom: string; email: string; password: string }>
): Promise<UserEntity> {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return new UserEntity(
    user.id,
    user.nom,
    user.prenom,
    user.email,
    user.password,
    user.isAdmin,
    user.isLoggedIn
  );
}


}
