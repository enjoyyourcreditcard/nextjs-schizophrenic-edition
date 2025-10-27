import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { destroyUser, getUsers } from "@/lib/actions"
import { getServerSession } from "next-auth"
import Image from "next/image"

export default async function Users() {
    const users = await getUsers()

    const session = await getServerSession(authOptions)

    const user = session.user

    console.log(user)

    return(
        <div className="flex flex-col justify-center items-center gap-4 h-screen" >
            <table>
                <thead>
                    <tr>
                        <th className="border px-4 py-1">#</th>
                        <th className="border px-4 py-1">Username</th>
                        <th className="border px-4 py-1">Email</th>
                        <th className="border px-4 py-1">Image</th>
                        <th className="border px-4 py-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((data, index) => {
                            const destroyUserWithId = destroyUser.bind(null, data.id)

                            return(
                                <tr key={data.id}>
                                    <td className="border px-4 py-1">{index + 1}</td>
                                    <td className="border px-4 py-1">{data.username}</td>
                                    <td className="border px-4 py-1">{data.email}</td>
                                    <td className="border px-4 py-1">
                                        {
                                            data.image ?
                                            <Image
                                                className="rounded-full h-[70px] w-[70px] object-cover"
                                                src={data.image}
                                                width={70}
                                                height={70}
                                                alt={data.image}
                                            />
                                            :
                                            <img
                                                className="rounded-full h-[70px] w-[70px] object-cover"
                                                src="https://ih1.redbubble.net/image.5356383745.5149/raf,360x360,075,t,fafafa:ca443f4786.u1.jpg"
                                                width={70}
                                                height={70}
                                                alt="default image"
                                            />
                                        }
                                    </td>
                                    <td className="border px-4 py-1">
                                        <form action={destroyUserWithId}>
                                            <button className={user.id == data.id ? "text-stone-400" : "text-red-400"} type="submit" disabled={user.id == data.id}>Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}