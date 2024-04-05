import React, { useRef, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyIcon from "@mui/icons-material/Key";
import Person2Icon from "@mui/icons-material/Person2";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //integration
  const [allData, setAllData] = useState({
    username: "",
    password: "",
  });

  //submit
  const { loading, logIn } = useLogin();
  const handleSubmit = () => {
    logIn(allData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-200">
          Login
        </h2>
        <form className="space-y-4" autoComplete="false">
          <label className="input input-bordered flex items-center gap-2">
            <Person2Icon className="icon-eye" />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={allData?.username}
              onChange={(e) =>
                setAllData({ ...allData, username: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <KeyIcon className="icon-eye" />
            <input
              ref={passwordInputRef}
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
              value={allData?.password}
              onChange={(e) =>
                setAllData({ ...allData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="focus:outline-none"
            >
              {showPassword ? (
                <VisibilityOffIcon className="icon-eye" />
              ) : (
                <RemoveRedEyeIcon className="icon-eye" />
              )}
            </button>
          </label>

          <div className="flex start-0 text-gray-200">
            <Link to={"/signup"}>Don't have an Account ?</Link>
          </div>

          <div>
            <button
              type="button"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner loading-xs"></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
