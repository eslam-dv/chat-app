import { IUser } from "../models/userModle";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
