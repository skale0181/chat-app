import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLogout } from "../../hooks/useLogout";

export const LogoutButton = () => {
  const { loading, logOut } = useLogout();

  const handleLogout = () => {
    logOut();
  };
  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <ExitToAppIcon
          className="w-6 h-6 text-white cursor-pointer"
          titleAccess="Logout"
          disabled={loading}
          onClick={handleLogout}
        />
      )}
    </div>
  );
};
