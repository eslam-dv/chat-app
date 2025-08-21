import { ErrorRequestHandler, Response } from "express";

import AppError from "../utils/AppError";

const handleAppError = (error: AppError, res: Response) => {
  res.status(error.statusCode).json({ message: error.message });
};

const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
  console.error(`PATH: ${req.path}`, error);

  if (error instanceof AppError) {
    handleAppError(error, res);
    return;
  }

  return res.status(500).send("Internal server error");
};

export default errorHandler;
