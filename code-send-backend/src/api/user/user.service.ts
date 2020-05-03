import { UserRequest } from "./user.type";
import userModel, { UserDocument } from "./user.model";
import bcrypt from "bcrypt";
const saltRounds = 10;

export default class UserService {
  createUser = (user: UserRequest) => {
    return new Promise<UserDocument>(async (resolve, reject) => {
      try {
        const hash = await bcrypt.hash(user.password, saltRounds);
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
}
