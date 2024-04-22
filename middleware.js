import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
// import auth_options from "./lib/authOptions";
const protectedRoutes = ['/']
const adminRoutes = ['/dashboard', '/dashboard/users', '/dashboard/permission']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isAdminRoute = adminRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)


    const token = await getToken({ req });
    const res = NextResponse.next();
    if (isProtectedRoute && !token?.id) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // 6. Redirect to /dashboard if the user is authenticated
    // if (
    //     isPublicRoute &&
    //     token?.id
    // ) {
    //     return NextResponse.redirect(new URL('/', req.nextUrl))
    // }
    if (
        isAdminRoute &&
        token.role !== 'admin'
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    return res
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}