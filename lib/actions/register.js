"use server";

import bcrypt from "bcryptjs";
import { User } from "../../../lib/database.mjs"; // Adjust the path to where your User model is located

export const reg = async (values) => {
  const { email, pword } = values;

  // email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Invalid email format" };
  }

  // password at least 8 chars
  if (!pword || pword.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return { error: "Email is already in use." };
    }

    const hashedPassword = await bcrypt.hash(pword, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return {
      success: "Registration successful.",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  } catch (error) {
    console.error("Error during registration:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
