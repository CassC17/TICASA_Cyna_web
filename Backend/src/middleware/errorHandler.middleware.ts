import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  console.error(err); 

  const statusCode = err.status || 500;
  let message = "Une erreur interne est survenue";

  if (statusCode === 400) {
    message = "Requête invalide. Vérifiez les données envoyées.";
  } else if (statusCode === 401) {
    message = "Accès non autorisé. Identifiants incorrects.";
  } else if (statusCode === 403) {
    message = "Accès interdit. Vous n'avez pas les permissions nécessaires.";
  } else if (statusCode === 404) {
    message = "Ressource non trouvée.";
  } else if (statusCode === 409) {
    message = "Conflit. L'email est déjà utilisé.";
  }

  res.status(statusCode).json({
    error: message,
    details: err.message,
  });
};
