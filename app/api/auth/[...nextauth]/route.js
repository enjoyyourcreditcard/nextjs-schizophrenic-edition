import { getUserByEmail } from "@/lib/actions"
import { compare } from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const email     = credentials.email ? credentials.email : null
                const password  = credentials.password ? credentials.password : null

                const user = await getUserByEmail(email)

                if (!user) return null

                const isValid = await compare(password, user.password)

                if (!isValid) return null

                return {
                    id      : user.id,
                    email   : user.email,
                    name    : user.username,
                    image   : user.image
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }

            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }