import dbConnect from "@/lib/monogConnect";
import { findUser } from "@/services/db/userServices";
import { BAD_REQUEST } from "@/utils/httpStatusCodes";
import createHttpError from "http-errors";
import CredentialsProvider from "next-auth/providers/credentials";
const { ObjectId } = require('mongodb')
import bcrypt from "bcrypt";

const auth_options = async () => {
const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },

    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                //Connect to DB
                await dbConnect();
                //Find user with the email
                const user = await findUser({ email: credentials.email });

                console.log(user)
                //Not found - send error res
                if (!user) {
                    throw createHttpError(
                        BAD_REQUEST,
                        "Invalid account or password details "
                    );
                }
                //if Email not verfired than raise an error
                if (!user.verified) {
                    throw createHttpError(
                        BAD_REQUEST,
                        "Your Email is not verified,please check your inbox and click the link to verify your email "
                    );
                }
                //Check hased password with DB password
                const checkPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                // //Incorrect password - send response
                if (!checkPassword) {
                    throw createHttpError(
                        BAD_REQUEST,
                        "Invalid account or password details "
                    );
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && user?._id) {
                token.id = user._id
                token.role=user.role
            }
            return token;
        },
        async session({ user, session, token }) {
            session.user.role = token.role ? token.role : 'user'
            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/",
    }
}
    return authOptions
}


export default auth_options