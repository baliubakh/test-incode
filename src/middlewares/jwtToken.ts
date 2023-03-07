import { NextFunction, Request, Response } from "express";
import { AUTHORIZATION } from "../constants";
import { userRepository } from "../repositories/user.repository";
import { jwtUtil } from "../utils/jwt.util";

class TokenMiddleware {
  public async checkAccessToken(
    req: Request,
    _res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token || !token.startsWith("Bearer ")) {
        next({ status: 401, message: "Invalid Token" });
        return;
      }

      const tokenArr = token.split(" ");

      const accessToken = tokenArr[1];

      const check = jwtUtil.validateToken(accessToken);
      // @ts-ignore
      const { email } = check;
      if (!email) {
        next({ status: 401, message: "Invalid Token" });
        return;
      }
      const user = await userRepository.getByFilter({ email });

      if (!user) {
        next({ status: 401, message: "Invalid Token" });
        return;
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const tokenMiddleware = new TokenMiddleware();
