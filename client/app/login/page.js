"use client";

import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { login } from "@/app/api/actions/login";
import { useTransition } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const router = useRouter();

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3001/api/users/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (response.ok) {
  //       const user = await response.json();
  //       // Save the user data to localStorage
  //       localStorage.setItem("username", user.username);
  //       router.push("/profile");
  //     } else {
  //       // Handle error
  //       console.error("Failed to login");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      pword: "",
    },
  });

  const onSubmit = (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          type="text"
          placeholder="Email"
          disabled={isPending}
          {...register("email")}
          className="mb-2 p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          disabled={isPending}
          {...register("pword")}
          className="mb-2 p-2 border"
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white p-2"
          >
            Sign In
          </button>
          <Link href="/" className="bg-gray-600 text-white p-2">
            Back
          </Link>
        </div>

        <div className="mt-4">
          <>
            <span>Don’t have an account? </span>
            <Link href="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </>
        </div>
      </div>
    </form>
  );
}
