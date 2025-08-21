import bcrypt from "bcrypt";

const hashValue = async (val: string) => {
  const salt = await bcrypt.genSalt(10);
  const value = await bcrypt.hash(val, salt);
  return value;
};

const compareValue = async (candidate: string, encrypted: string) => {
  return await bcrypt.compare(candidate, encrypted);
};

export { hashValue, compareValue };
