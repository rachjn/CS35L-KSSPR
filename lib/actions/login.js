"use server";

import AuthError from 

export const login = async (values) => {
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

  // Proceed with login logic (e.g., check against a database)
  console.log("Validated email and password:", email, pword);

  // If validation passes, you can continue with authentication logic here.
  // For example, returning a success message or a user object.
  return { success: "Login successful" };



  const {email, password} = validatedFields.data; 

  try{
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

  } catch (error){
    if (error instanceof AuthError )
  }
};
