import { NextFunction, Request, Response } from "express";

import AppError from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import UserModel from "../models/userModle";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new AppError(401, "Unauthorized - No Token Provided");
  }

  const userId = verifyToken(token);

  const user = await UserModel.findById(userId);
  if (!user) throw new AppError(401, "Unauthorized - Invalid Token");

  req.user = user;

  next();
};

export default protect;
