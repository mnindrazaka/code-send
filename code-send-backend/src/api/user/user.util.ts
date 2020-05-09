import bcrypt from "bcrypt";
const saltRounds = 10;

const hash = async (plainText: string) => {
  return await bcrypt.hash(plainText, saltRounds);
};

const compare = async (plainText: string, hash: string) => {
  return await bcrypt.compare(plainText, hash);
};

export default { hash, compare };
