"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Save the user data (WIP, can be improved with actual authentication)
    localStorage.setItem("username", username);
    router.push("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login or Create Account</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border"
      />
      
      <div className="flex space-x-4">
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
          Sign In
        </button>
        <Link
          href="/"
          className="bg-gray-600 text-white p-2"
        >
          Back
        </Link>
      </div>
    </div>
  );
}