import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { errorHandler } from "../middlewares/errorHandler";
import { tokenMiddleware } from "../middlewares/jwtToken";
import { tryToSend } from "../middlewares/tryToSend";

const router = Router();

router.get(
  "/",
  tokenMiddleware.checkAccessToken,
  errorHandler,
  tryToSend(userController.getUsers)
);
router.post("/login", tryToSend(userController.loginUser));

router.post(
  "/",
  tokenMiddleware.checkAccessToken,
  tryToSend(userController.addNewUser)
);

router.post(
  "/",
  tokenMiddleware.checkAccessToken,
  tryToSend(userController.changeBoss)
);

export const userRouter = router;
