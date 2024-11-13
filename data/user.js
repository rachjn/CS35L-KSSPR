import { sequelize } from "@/lib/database.mjs";
import { User } from "@/lib/database.mjs";

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
