"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values) => {
  console.log("Input values:", values);
  const { email, password } = values;

  // email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Invalid email format" };
  }

  // password at least 8 chars
  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  // Proceed with login logic (e.g., check against a database)
  // console.log("Validated email and password:", email, pword);
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }

  // If validation passes, you can continue with authentication logic here.
  // For example, returning a success message or a user object.
  return { success: "Login successful" };
};
