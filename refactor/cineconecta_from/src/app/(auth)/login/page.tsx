"use client"
import Image from "next/image"
import capibaraLeft from "../../../../public/png/Capibara left.png"
import capibaraRight from "../../../../public/png/Capibara right.png"
import logo from "../../../../public/jpg/logo.jpg"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface LoginForm { 
  email: string
  password: string
}

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: ''
  }) 
  
  const route = useRouter()

  const handleRegister = () => {
    route.push('/register')
  }

  const handleHome = () => {
    route.push('/')
  }

  const updateLoginForm = (key: keyof LoginForm, value: string) =>{
    setLoginForm((prevForm) => ({
      ...prevForm,
      [key]: value
    }))
  }

  return (
    <main className="w-screen h-screen bg-gradient-to-b from-black from-1% to-[#3C1A81] to-50%">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12">

        <Image
          src={capibaraLeft}
          alt="Capybara Romano Izquierda"
          width={350}
          height={300}
          className="hidden md:block transform "
        />

        <div className="bg-black/30 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <Image
            src={logo}
            alt="CineConecta Logo"
            width={100}
            height={100}
            className="mx-auto mb-6 cursor-pointer"
            onClick={handleHome}
          />

          <div className="flex flex-col gap-4">
            <Input placeholder="Email" value={loginForm.email} onChange={(e) => updateLoginForm('email', e.target.value)} />
            <Input placeholder="Password" type="password" value={loginForm.password} onChange={(e) => updateLoginForm('password', e.target.value)} />
          </div>

          <Button text="Login" color="#ffff" bgcolor="#371775" className="mt-10 hover:shadow hover:shadow-purple-800 transition-all duration-500" />

          <div className="flex flex-col  mt-5">
            <p className="text-white text-sm">If you don't have account </p>
            <a onClick={handleRegister} className="text-purple-500 cursor-pointer text-sm">Create account </a>

          </div>

        </div>

        <Image
          src={capibaraRight}
          alt="Capybara Romano Derecha"
          width={350}
          height={300}
          className="hidden md:block"
        />
      </div>

    </main>
  )
}

export default LoginPage