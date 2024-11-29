import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN } from './constant'

export function middleware(request: NextRequest) {

    if (request.cookies.has(ACCESS_TOKEN) && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
        return Response.redirect(new URL('/dashboard', request.url))
    }

    if (!request.cookies.has(ACCESS_TOKEN) && (!request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register'))) {
        return Response.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/user', '/login', '/register'],
}