import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "../../../axios"

export const authOptions = {
    secret: "process.env.NextAuth_SECRET",
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password",
                },
            },

            async authorize(credentials, req) {
                const { email, password } = credentials
                try {
                    const loginResponse = await api.post("/api/auth/local",{
                        identifier: email,
                        password: password
                    })
    
                    // console.log("loginResponse",loginResponse)
                    if (loginResponse?.data?.jwt) {
                        const fetchUserImage = await api.get(`/api/users/${loginResponse?.data?.user?.id}?populate=*`, {
                            headers: {
                                 Authorization:`Bearer ${loginResponse?.data?.jwt}`
                             }
                         })
                        console.log("fetchUserImage", fetchUserImage)
                        const singleUserData = fetchUserImage.data;
                        const authData = loginResponse.data
                        return {singleUserData,authData}
                    }
                    return null
                    
                } catch (e) {
                    console.log("error mesage",e)
                }
               
                // const res = await fetch("http://localhost:3000/api/login", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //         email,
                //         password,
                //     }),
                // });
                // const user = await res.json();
                // if (res.ok && user) {
                //     return user;
                // } else return null;
            },
        }),
      
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            const url_to_redirect_to = `${baseUrl}/admin`
            return url_to_redirect_to
          },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;
            return session;
        },
    },
    secret: "test",
    jwt: {
        secret: "test",
        encryption:true
    }
    
}
export default NextAuth(authOptions)