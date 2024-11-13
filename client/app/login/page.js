"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { login } from "@/app/api/actions/login";
import { useTransition } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      pword: "",
    },
  });

  const onSubmit = (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        username: data.email,
        password: data.pword,
      });
      // login(data).then((data) => {
      //   setError(data.error);
      //   setSuccess(data.success);
      // });
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
