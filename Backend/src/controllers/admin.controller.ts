import { Request, Response, NextFunction } from "express";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
};
