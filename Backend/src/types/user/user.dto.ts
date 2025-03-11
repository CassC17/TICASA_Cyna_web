export class UserDTO {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    isAdmin: boolean;
    isLoggedIn: boolean;
  
    constructor(id: number, nom: string, prenom: string, email: string, isAdmin: boolean, isLoggedIn: boolean) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.isAdmin = isAdmin;
      this.isLoggedIn = isLoggedIn;
    }
  }
  