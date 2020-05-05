import cookie from "js-cookie";
import jwt from "jsonwebtoken";

interface User {
  username: string;
}

const key = "token";

export function saveToken(token: string) {
  cookie.set(key, token);
}

export function removeToken() {
  cookie.remove(key);
}

export function getToken() {
  return cookie.get(key);
}

export function getUser() {
  const token = cookie.get(key);
  if (!token) return;
  return jwt.decode(token) as User;
}
