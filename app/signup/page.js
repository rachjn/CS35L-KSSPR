"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { reg } from "@/lib/actions/register";
import { LuAlertTriangle } from "react-icons/lu";
import { useTransition } from "react";
import { HomeButton } from "@/components/HomeButton";
import { SuccessAlert, Warning } from "@/components/Alerts";

export default function SignUp() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reg(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HomeButton />
      <div className="flex items-center justify-center h-screen">
        <div
          id="outer-border"
          className="flex border border-white border-opacity-80 rounded-lg shadow-xl overflow-hidden max-w-[50rem]"
        >
          <div
            id="reg"
            className="px-4 w-[120rem] flex flex-col items-center justify-center"
          >
            <h1 className="text-3xl mb-4 font-bold text-dark-brown">
              welcome!
            </h1>

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
              className="mb-2 p-2 w-[15rem] border rounded text-dark-brown"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              disabled={isPending}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="mb-2 p-2 w-[15rem] border rounded text-dark-brown"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {error && <Warning>{error} </Warning>}
            {success && <SuccessAlert>{success}</SuccessAlert>}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isPending}
                className="text-xl bg-dark-brown text-lighter-brown p-2 px-[5.4rem] rounded font-bold"
              >
                sign up
              </button>
            </div>

            <div className="mt-4">
              <>
                <span>already have an account? </span>
                <Link
                  href="/login"
                  className="font-bold text-my-blue hover:text-my-pink transition-colors duration-300"
                >
                  sign in
                </Link>
              </>
            </div>
          </div>
          <div className="p-12 flex flex-col text-sm items-center justify-center bg-dark-brown text-lighter-brown ">
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-bold text-base">
                  "Oops I Had an Acc(id)ent"{" "}
                </span>
                is an educational typing game that challenges users to type what
                they hear — specifically, words spoken in different English
                accents from around the world.
              </div>
              <div>
                By practicing with these accents, you’ll improve your listening
                and typing skills while also becoming more comfortable with how
                English sounds across different cultures and regions.
              </div>
              <div>
                Our goal is to help users build a deeper understanding and
                appreciation for accents, while also promoting inclusivity and
                empathy.
              </div>
              <div>
                In a world where people with non-standard accents often face
                bias, we want to combat linguistic racism and encourage more
                open-minded, respectful communication. Through this game, we
                hope to create a space where linguistic diversity is celebrated,
                and everyone’s way of speaking is valued.
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
