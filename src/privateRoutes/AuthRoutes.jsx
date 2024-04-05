import { Navigate } from "react-router-dom";
import React, { useState } from "react";
// import addDeleteGetLocalStorage from "../prototype/addDeleteGetLocalStorage";
// import { STORAGE } from "../common/LocalVariable";
import { useAuthContext } from "../context/AuthContext";

export const AuthRoutes = ({ children }) => {
  // const isUserAccess = addDeleteGetLocalStorage(STORAGE?.USER_DATA, {}, "get");
  const { authUser } = useAuthContext();
  if (authUser) {
    return children;
  }
  return <Navigate to="/login" replace />;
};
