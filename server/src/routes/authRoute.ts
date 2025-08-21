import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/authController";
import protect from "../middleware/authMiddleware";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.put("/update-profile", protect, updateProfile);

authRouter.get("/check", protect, checkAuth);

export default authRouter;
