"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        // Save the user data to localStorage
        localStorage.setItem("username", user.username);
        router.push("/profile");
      } else {
        // Handle error
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Clear the input fields
        setUsername("");
        setPassword("");
        // Switch to login view
        setIsLogin(true);
      } else {
        // Handle error
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">{isLogin ? "Login" : "Sign Up"}</h1>

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
        <button
          onClick={isLogin ? handleLogin : handleSignup}
          className="bg-blue-500 text-white p-2"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
        <Link
          href="/"
          className="bg-gray-600 text-white p-2"
        >
          Back
        </Link>
      </div>

      <div className="mt-4">
        {isLogin ? (
          <>
            <span>Don’t have an account? </span>
            <a
              href="#"
              onClick={() => setIsLogin(false)}
              className="text-blue-500"
            >
              Sign Up
            </a>
          </>
        ) : (
          <>
            <span>Already have an account? </span>
            <a
              href="#"
              onClick={() => setIsLogin(true)}
              className="text-blue-500"
            >
              Login
            </a>
          </>
        )}
      </div>
    </div>
  );
}