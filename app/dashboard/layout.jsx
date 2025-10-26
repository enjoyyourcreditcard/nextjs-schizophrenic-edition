import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

export default function DashboardLayout({children}) {
    return(
        <>
            <Navbar></Navbar>
            <SessionWrapper>
                {children}
            </SessionWrapper>
        </>
    )
}