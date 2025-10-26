import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const session   = await getServerSession(authOptions)
    const user      = session.user

    return(
        <nav className="p-4 border-b w-full sticky top-0">
            <div className="flex justify-between items-center">
                <LogoutButton />
                <div className="flex justify-center items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                    </div>
                    {
                        user.image ?
                        <Image
                            className="rounded-full h-[30px] w-[30px] object-cover"
                            src={user.image}
                            width={30}
                            height={30}
                            alt={user.image}
                        /> :
                        <img
                            className="rounded-full h-[30px] w-[30px] object-cover"
                            src="https://ih1.redbubble.net/image.5356383745.5149/raf,360x360,075,t,fafafa:ca443f4786.u1.jpg"
                            width={30}
                            height={30}
                            alt="default image"
                        />
                    }
                </div>
            </div>
        </nav>
    )    
}
