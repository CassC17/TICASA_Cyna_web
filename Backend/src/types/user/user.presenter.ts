import { UserDTO } from "./user.dto";

export class UserPresenter {
  static toDTO(user: any): UserDTO {
    return new UserDTO(user.id, user.nom, user.prenom, user.email, user.isAdmin, user.isLoggedIn);
  }
}
