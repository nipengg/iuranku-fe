import { getToken } from '@/utils/userSession'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = getToken();
    
    if (!token)
    {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/user', '/about'],
}