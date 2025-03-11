import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterInput {
    @Expose()
    @IsNotEmpty({ message: "Le nom est obligatoire" })
    nom!: string;

    @Expose()
    @IsNotEmpty({ message: "Le prénom est obligatoire" })
    prenom!: string;
  
    @Expose()
    @IsEmail({}, { message: "L'email doit être valide" })
    email!: string;
  
    @Expose()
    @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
    @MinLength(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
    password!: string;
  }
  

export class LoginInput {
  @Expose()
  @IsEmail({}, { message: "L'email doit être valide" })
  email!: string;

  @Expose()
  @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
  password!: string;
}
