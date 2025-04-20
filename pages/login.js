"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import AuthForm from "../components/AuthForm"
import { ArrowLeft } from "lucide-react"

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Head>
        <title>{isSignUp ? "Sign Up" : "Log In"} - Endel</title>
        <meta name="description" content="Log in or sign up to Endel to access personalized soundscapes." />
      </Head>

      <header className="px-4 py-4 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="flex items-center text-gray-700 hover:text-red-600 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold inline-block mb-6">
              <span className="text-red-600">endel</span>
            </Link>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-gray-600">
              {isSignUp ? "Sign up to start your sound journey" : "Log in to access your personalized soundscapes"}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <AuthForm isSignUp={isSignUp} />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button onClick={toggleAuthMode} className="text-red-600 ml-2 hover:underline focus:outline-none">
                  {isSignUp ? "Log in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Endel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
