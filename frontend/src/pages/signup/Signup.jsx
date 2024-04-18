import React, { useRef, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyIcon from "@mui/icons-material/Key";
import Person2Icon from "@mui/icons-material/Person2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useSignUp from "../../hooks/useSignup";

export const Signup = () => {
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  //integration

  const [allData, setAllData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  //submit 
  const {loading, signUp} = useSignUp()
  const handleSubmit = ()=>{
    signUp({...allData, gender})
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-200">
          Sign Up
        </h2>
        <form className="space-y-4" autoComplete="false">
          <label className="input input-bordered flex items-center gap-2">
            <AccountCircleIcon className="icon-eye" />
            <input
              value={allData?.fullName}
              onChange={(e) => {
                setAllData({
                  ...allData,
                  fullName: e.target.value.trimStart(),
                });
              }}
              type="text"
              className="grow"
              placeholder="Full Name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <Person2Icon className="icon-eye" />
            <input
              value={allData?.username}
              onChange={(e) => {
                setAllData({
                  ...allData,
                  username: e.target.value.trimStart(),
                });
              }}
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <KeyIcon className="icon-eye" />
            <input
              value={allData?.password}
              onChange={(e) => {
                setAllData({
                  ...allData,
                  password: e.target.value.trimStart(),
                });
              }}
              ref={passwordInputRef}
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
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
          <label className="input input-bordered flex items-center gap-2">
            <KeyIcon className="icon-eye" />
            <input
              value={allData?.confirmPassword}
              onChange={(e) => {
                setAllData({
                  ...allData,
                  confirmPassword: e.target.value.trimStart(),
                });
              }}
              ref={confirmPasswordInputRef}
              type={showConfirmPassword ? "text" : "password"}
              className="grow"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="focus:outline-none"
            >
              {showConfirmPassword ? (
                <VisibilityOffIcon className="icon-eye" />
              ) : (
                <RemoveRedEyeIcon className="icon-eye" />
              )}
            </button>
          </label>
          <div className="flex items-center gap-4 text-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
                className="hidden"
              />
              {gender === "male" ? (
                <RadioButtonCheckedIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
              Male
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
                className="hidden"
              />
              {gender === "female" ? (
                <RadioButtonCheckedIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
              Female
            </label>
          </div>
          <div className="flex start-0 text-gray-200">
            <Link to={"/login"}>Already have an Account ?</Link>
          </div>
          <div>
            <button
              disabled={loading}
              type="button"
              onClick={handleSubmit}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
             {loading ? <span className="loading loading-spinner loading-xs"></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
