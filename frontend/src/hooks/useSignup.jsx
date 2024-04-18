import { useState } from "react";
import toast from "react-hot-toast";
import globalRequest from "../prototype/globalRequest";
import { API_ROUTES } from "../common/ApiRoutes";
import { useNavigate } from "react-router-dom";
import addDeleteGetLocalStorage from "../prototype/addDeleteGetLocalStorage";
import { useAuthContext } from "../context/AuthContext";
import { STORAGE } from "../common/LocalVariable";

const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //get from context
  const { setAuthUser } = useAuthContext
  ();

  const signUp = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const isSuccess = handleErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!isSuccess) return;

    let data = {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    };
    setLoading(true);
    try {
      const res = await globalRequest(
        API_ROUTES?.SIGN_UP,
        "post",
        data,
        {},
        false
      );
      //set to local storage
      addDeleteGetLocalStorage(STORAGE?.USER_DATA, res, "add", "single");
      //update context
      setAuthUser(res);
      toast.success("Signed up successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp };
};

export default useSignUp;

function handleErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password don not match");
    return false;
  }
  return true;
}
