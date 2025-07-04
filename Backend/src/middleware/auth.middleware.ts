import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import type { User } from '@prisma/client';


const prisma = new PrismaClient();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return; // Ensure that the function stops execution
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };

    // Attach user ID to the request object with proper typing
    (req as unknown as { user: { id: number; email: string } }).user = {
      id: decoded.id,
      email: decoded.email,
    };

    next(); // Call next() only if authentication succeeds
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (!user || !user.id) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  prisma.user.findUnique({ where: { id: user.id } }).then((dbUser: User | null) => {
    if (!dbUser?.isAdmin) {
      res.status(403).json({ error: "Accès interdit" });
      return;
    }
    next();
  });
};

