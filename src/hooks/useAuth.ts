"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used with an AuthProvider");
  }

  return authContext;
}

export default useAuth;
