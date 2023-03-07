import { NextFunction, Request, Response } from "express";

export const tryToSend =
  (callback: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await callback(req, res);
      res.send(result);
    } catch (error: any) {
      if (error && error.code === 11000) {
        return res.status(422).send({ message: "User already exist!" });
      }

      if (error && error.name === "ValidationError") {
        return res.status(400).send({ message: "Bad Request" });
      }

      next(error);
    }
  };
