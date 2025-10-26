"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Login() {
    async function handleLogin(formData) {
        const response = await signIn("credentials", {
            redirect    : false,
            email       : formData.get("email"),
            password    : formData.get("password"),
        })

        if (!response.ok) {
            alert("log in failed")
            return
        }

        redirect("/dashboard/users")
    }

    return(
        <form
            action={handleLogin}
            className="flex flex-col justify-center items-center gap-4 h-screen" 
        >
            <input
                type="email"
                name="email"
                placeholder="email.."
                id="email"
            />
            <input
                type="password"
                name="password"
                placeholder="password.."
                id="password"
            />
            <br />
            <button
                type="submit"
                className="text-blue-300"
            >
                log in
            </button>
            <Link href="/register" className="text-zinc-300">create an account</Link>
        </form>
    )
}