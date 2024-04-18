import { useState } from "react";
import { API_ROUTES } from "../common/ApiRoutes";
import globalRequest from "../prototype/globalRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import addDeleteGetLocalStorage from "../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../common/LocalVariable";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //get from context
  const { setAuthUser } = useAuthContext();

  const logIn = async ({ username, password }) => {
    const isSuccess = handleErrors({ username, password });
    if (!isSuccess) return;

    let data = {
      username,
      password,
    };
    setLoading(true);
    try {
      const res = await globalRequest(
        API_ROUTES?.LOGIN,
        "post",
        data,
        {},
        false
      );
      //set to local storage
      addDeleteGetLocalStorage(STORAGE?.USER_DATA, res, "add", "single");
      //update context
      setAuthUser(res);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { logIn, loading };
};

function handleErrors({ username, password }) {
  if (!username || !password) {
    toast.error("All fields are required");
    return false;
  }
  return true;
}
