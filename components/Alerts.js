import { LuAlertTriangle } from "react-icons/lu";

export const Warning = ({ children }) => {
  return (
    <div className="text-red-500 bg-red-500 bg-opacity-20 py-2 px-4 mb-2 border border-red-500 rounded">
      <div className="flex items-center gap-2">
        <LuAlertTriangle />
        {children}
      </div>
    </div>
  );
};

export const SuccessAlert = ({ children }) => {
  return (
    <div className="text-green-500 bg-green-500 bg-opacity-20 py-2 px-4 mb-2 border border-green-500 rounded">
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};
