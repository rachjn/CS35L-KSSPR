"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { login } from "@/lib/actions/login";
import { useTransition } from "react";
import { HomeButton } from "@/components/HomeButton";
import { SuccessAlert, Warning } from "@/components/Alerts";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
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
      <HomeButton />
      <div className="flex items-center justify-center h-screen">
        <div
          id="outer-border"
          className="flex border border-white border-opacity-80 rounded-lg shadow-xl overflow-hidden max-w-[50rem]"
        >
          <div
            id="login"
            className="px-4 w-[120rem] flex flex-col items-center justify-center"
          >
            <h1 className="text-3xl mb-4 font-bold text-dark-brown">
              welcome back!
            </h1>
            <input
              type="text"
              placeholder="email"
              disabled={isPending}
              {...register("email")}
              className="mb-2 p-2 w-[15rem] border rounded text-dark-brown"
            />
            <input
              type="password"
              placeholder="password"
              disabled={isPending}
              {...register("password")}
              className="mb-2 p-2 w-[15rem] border rounded text-dark-brown "
            />
            {error && <Warning>{error}</Warning>}
            {success && <SuccessAlert>{success}</SuccessAlert>}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isPending}
                className="text-xl bg-dark-brown text-lighter-brown p-2 px-[5.6rem] rounded font-bold"
              >
                sign in
              </button>
            </div>

            <div className="mt-4">
              <>
                <span>don’t have an account? </span>
                <Link
                  href="/signup"
                  className="font-bold text-my-blue hover:text-my-pink transition-colors duration-300"
                >
                  sign up
                </Link>
              </>
            </div>
          </div>
          <div className="p-12 flex flex-col text-sm items-center justify-center bg-dark-brown text-lighter-brown ">
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-bold text-base">
                  {'"'}Oops I Had an Acc(id)ent{'" '}
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
