"use client"

import { updateUser } from "@/lib/actions"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Profile() {
    const { data: session, status, update } = useSession()

    const user = session?.user ? session?.user : {}

    async function handleUpdateUser(formData) {
        const updateUserById = updateUser.bind(null, user.id)

        await updateUserById(formData)

        update()
    }

    return(
        <div className="flex flex-col justify-center items-center gap-4 h-screen">
            {
                user.image ?
                <Image
                    className="object-cover rounded-full w-[100px] h-[100px]"
                    src={user.image}
                    width={100}
                    height={100}
                    alt="your image"
                /> : 
                <img
                    className="object-cover rounded-full w-[100px] h-[100px]"
                    src="https://ih1.redbubble.net/image.5356383745.5149/raf,360x360,075,t,fafafa:ca443f4786.u1.jpg"
                    width={100}
                    height={100}
                    alt="default image"
                />
            }
            <form action={handleUpdateUser} className="flex flex-col justify-center items-center gap-4">
                <input type="file" name="image" id="image" />
                <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={user.name}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user.email}
                />
                <button className="text-green-400" type="submit">update</button>
            </form>
        </div>
    )
}