import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value

    if (!currentUser && request.nextUrl.pathname.startsWith('/admin/edit')) {
        return Response.redirect(new URL('/admin/login', request.url))
    }
}