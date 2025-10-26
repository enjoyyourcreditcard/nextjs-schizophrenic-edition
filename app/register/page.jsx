"use client"

import { storeUser } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
    message: null
}

export default function Register() {
    const [state, formAction, pending] = useActionState(storeUser, initialState)

    return(
        <form
            action={formAction}
            className="flex flex-col justify-center items-center gap-4 h-screen" 
        >
            <input
                type="text"
                name="username"
                placeholder="username.."
                id="username"
            />
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
            <input
                type="file"
                name="image"
                id="image"
            />
            <br />
            <button
                type="submit"
                className="text-amber-300"
            >
                register
            </button>
            <Link href="/login" className="text-zinc-300">already have an account</Link>
        </form>
    )
}