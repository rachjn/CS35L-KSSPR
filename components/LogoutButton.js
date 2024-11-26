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
          className="px-8 py-1 rounded-md bg-light-brown lowercase text-xl text-dark-brown border border-white border-opacity-40 shadow-md cursor-pointer"
        >
          {children}
        </div>
      </div>
    </>
  );
};
