import { RequestHandler } from "express";

const catchError =
  (controller: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchError;
