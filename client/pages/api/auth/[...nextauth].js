import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../middleware/mongodb"
import GoogleProvider from 'next-auth/providers/google'

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth
export default NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        SignIn: "/auth"
    },
    debug: process.env.NODE_ENV,
    adapter: MongoDBAdapter(clientPromise),
})