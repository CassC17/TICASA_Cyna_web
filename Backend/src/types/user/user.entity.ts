export class UserEntity {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isLoggedIn: boolean;
  
    constructor(
      id: number,
      nom: string,
      prenom: string,
      email: string,
      password: string,
      isAdmin: boolean = false,
      isLoggedIn: boolean = false
    ) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.password = password;
      this.isAdmin = isAdmin;
      this.isLoggedIn = isLoggedIn;
    }
  }
  