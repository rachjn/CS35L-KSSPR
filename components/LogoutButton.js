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
          className="p-2 rounded-md bg-cap-blue text-white text-outline font-bold border border-black cursor-pointer"
        >
          {children}
        </div>
      </div>
    </>
  );
};
