import { checkToken, getToken } from './utils/userSession'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    
    if (!checkToken())
    {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/user', '/about'],
}