import { Api } from "./Api";

export interface User extends Api {
  username: string;
  password: string;
}

export interface UserFormValues extends Omit<User, keyof Api> {}
