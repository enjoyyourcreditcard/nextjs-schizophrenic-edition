import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { forbidden } from "next/navigation"

export default async function Dashboard () {
    const session = await getServerSession(authOptions)

    const user = session.user

    if (user.role != "admin") {
        forbidden()
    }

    return(
        <div className="flex flex-col justify-center items-center gap-4 h-screen">
            Welcome back! {user.name}
        </div>
    )
}