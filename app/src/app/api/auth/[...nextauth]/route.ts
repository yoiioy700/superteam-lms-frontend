import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "mock_client_id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_client_secret",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "mock_client_id",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "mock_client_secret",
        }),
    ],
    pages: {
        signIn: '/login',
    }
})

export { handler as GET, handler as POST }
