import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import globalRequest from "../prototype/globalRequest";
import { API_ROUTES } from "../common/ApiRoutes";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logOut = async () => {
    setLoading(true);
    try {
      await globalRequest(API_ROUTES?.LOGOUT, "post", {}, {}, true);
      // remove from local storage
      localStorage.clear();
      // update context
      setAuthUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logOut };
};
