import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository";
import { IChangeBoss, IUser } from "../types/user.types";
import { jwtUtil } from "../utils/jwt.util";
import { AUTHORIZATION } from "../constants";

class UserController {
  public async getUsers(req: Request, res: Response, _next: NextFunction) {
    const token = req.get(AUTHORIZATION);

    if (token) {
      // @ts-ignore
      const { email, role } = jwtUtil.validateToken(token.split(" ")[1]);
      switch (role) {
        case "ADMIN":
          const users = await userRepository.getAllUsers();
          return users;
        case "BOSS":
          const boss = await userRepository.getByFilter({ email });
          const subordinates = boss[0].subordinates.map(
            async (_id) => await userRepository.getByFilter({ _id })
          );
          return [boss[0], ...subordinates];
        case "USER":
          const user = await userRepository.getByFilter({ email });
          return user;
        default:
          res.status(400).send({ message: "Bad Request" });
      }
    }
  }

  public async addNewUser(req: Request, res: Response, _next: NextFunction) {
    const { email, fullname, password, permissions, subordinates }: IUser =
      req.body;

    if (permissions === "BOSS" && subordinates.length === 0) {
      res
        .status(400)
        .send({ message: "Boss must have at least one subordinate" });
      return;
    } else if (permissions === "ADMIN" || permissions === "USER") {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      const user = await userRepository.createNewUser({
        email,
        fullname,
        password: hash,
        permissions,
        subordinates,
      });
      return user;
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  }

  public async loginUser(req: Request, res: Response, _next: NextFunction) {
    const { email, password }: IUser = req.body;
    const user: IUser[] = await userRepository.getByFilter({ email });
    if (user.length !== 0) {
      const isEqual = await bcrypt.compare(password, user[0].password);
      if (isEqual) {
        const token = jwtUtil.generateAccessToken(email, user[0].permissions);
        res.status(200).send({ token });
      } else {
        res.status(400).send({ message: "Bad Request" });
      }
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  }

  public async changeBoss(req: Request, res: Response, _next: NextFunction) {
    const { fromEmail, subordinate, toEmail }: IChangeBoss = req.body;
    const user: IUser[] = await userRepository.getByFilter({
      email: fromEmail,
    });

    const toUser: IUser[] = await userRepository.getByFilter({
      email: toEmail,
    });
    if (
      toUser.length !== 0 &&
      toUser[0]._id &&
      user.length !== 0 &&
      user[0].subordinates.includes(subordinate)
    ) {
      const updated = await userRepository.updateById(toUser[0]._id, {
        ...toUser[0],
        subordinates: [...toUser[0].subordinates, subordinate],
      });
      if (updated) {
        res.status(200).send({ message: "Updated" });
      } else {
        res.status(400).send({ message: "Bad Request" });
      }
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  }
}

export const userController = new UserController();
