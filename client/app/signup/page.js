"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { reg } from "@/app/api/actions/register";

export default function SignUp() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

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
      reg(data).then((result) => {
        setError(result.error);
        setSuccess(result.success);
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-4">Sign Up</h1>

        <input
          type="text"
          placeholder="Email"
          disabled={isPending}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          className="mb-2 p-2 border"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          disabled={isPending}
          {...register("pword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="mb-2 p-2 border"
        />
        {errors.pword && <p className="text-red-500">{errors.pword.message}</p>}

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white p-2"
          >
            Sign Up
          </button>
          <Link href="/" className="bg-gray-600 text-white p-2">
            Back
          </Link>
        </div>
        <div className="mt-4">
          <>
            <span>Already have an account? </span>
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </>
        </div>
      </div>
    </form>
  );
}
