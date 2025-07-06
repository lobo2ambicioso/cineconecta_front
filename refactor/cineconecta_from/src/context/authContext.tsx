"use client"
import { api } from "@/lib/axiosInstance";
import { createContext, ReactNode, useState } from "react";

interface AuthControllerType {
    user: string | null
    login: (email: string, password: string) => Promise<string>
    register: (name:string, email: string, password: string, phone: string) => Promise<string>
}

interface AuthProviderProps {
    children : ReactNode
}

export const AuthController =  createContext<AuthControllerType | undefined>(undefined)

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<string | null>(null);

    const login = async () : Promise<string> => {
        try {
            const response = api.post('/auth/health')
            return 'user'
        } catch (error) {
            return 'not user'
        }
    }

    const register = async () : Promise<string> => {
        try{
            const response = api.post('/auth/health')
            return 'true'
        } catch(error) {
            return 'false'
        }
    }
    
    return(
        <AuthController.Provider
            value={{
                user,
                login,
                register
            }}
        >
            {children}
        </AuthController.Provider>
    )
}