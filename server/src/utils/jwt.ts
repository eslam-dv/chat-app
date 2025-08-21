import { Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET, NODE_ENV } from "../constants/env";
import AppError from "./AppError";

const signToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: NODE_ENV != "development",
    sameSite: "strict",
  });

  return token;
};

const verifyToken = (token: string) => {
  const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
  if (!userId) {
    throw new AppError(401, "Unauthorized - Invalid token");
  }
  return userId;
};

export { signToken, verifyToken };
