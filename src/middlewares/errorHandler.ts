import { NextFunction, Request, Response } from "express";
import { IErrorBody } from "../types/server.types";

export const errorHandler = async (
  err: IErrorBody,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    return res.status(err.status || 400).send({ message: err.message });
  } catch (error) {
    return res.status(500).send(error);
  }
};
