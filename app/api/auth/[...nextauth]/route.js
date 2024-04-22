import NextAuth from "next-auth";

import auth_options from '../../../../lib/authOptions'

const handler = NextAuth(await auth_options());


export { handler as GET, handler as POST }