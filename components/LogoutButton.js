"use client";

import { logout } from "@/lib/actions/logout";

export const LogoutButton = ({ children }) => {
  const onClick = () => {
    logout();
  };

  return (
    <>
      <div className="flex">
        <div
          onClick={onClick}
          className="px-8 py-2 rounded-md bg-dark-brown lowercase text-xl text-lighter-brown border border-white border-opacity-40 cursor-pointer"
        >
          {children}
        </div>
      </div>
    </>
  );
};
