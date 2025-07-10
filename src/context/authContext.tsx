"use client";
import { api } from "@/lib/axiosInstance";
import { decodeJwt } from "@/utils/jwtDecode";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useState } from "react";

interface AuthControllerType {
  user: string | null;
  userName: string | null;
  email: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  login: (email: string, password: string) => Promise<string>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<string>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthControllerType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<string> => {
    try {
      const payload = {
        email: email,
        password: password,
      };
      const response = await api.post("/auth/login", payload);

      if (response.status == 200) {
        localStorage.setItem("Auth_token", response.data.token);
        setUser("Auth");
        const data = decodeJwt(response.data.token);
        console.log(data);
        setUserName(data?.name ?? null);
        setEmail(data?.email ?? null);
        router.push("/");
      }
      return "user";
    } catch (error) {
      setUser(null);
      console.log(error);
      return "not user";
    }
  };
  
  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string
  ): Promise<string> => {
    try {
      const payload = {
        name: name,
        email: email,
        password: password,
        phoneNumber: phone,
      };

      const response = await api.post("/auth/register", payload);

      if (response.status == 200) {
        router.push("/register/success");
      }

      return "true";
    } catch (error) {
      console.error("Error en el registro:", error);
      return "false";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userName,
        setUserName,
        email,
        setEmail,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
