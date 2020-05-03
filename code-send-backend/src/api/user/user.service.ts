import { UserRequest } from "./user.type";
import userModel, { UserDocument } from "./user.model";
import bcrypt from "utils/bcrypt";
import jwt from "jsonwebtoken";
import HttpException from "utils/httpException";

export default class UserService {
  createUser = (user: UserRequest) => {
    return new Promise<UserDocument>(async (resolve, reject) => {
      try {
        const hash = await bcrypt.hash(user.password);
        await userModel.init();
        const userDocument = await userModel.create({
          username: user.username,
          password: hash
        });
        resolve(userDocument);
      } catch (error) {
        reject(error);
      }
    });
  };

  authenticateUser = (user: UserRequest) => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const userDocument = await userModel.findOne({
          username: user.username
        });
        if (!userDocument)
          throw new HttpException(403, "Username or password wrong");

        const isPasswordMatch = await bcrypt.compare(
          user.password,
          userDocument.password
        );
        if (!isPasswordMatch)
          throw new HttpException(403, "Username or password wrong");

        const token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET || ""
        );
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  };
}
