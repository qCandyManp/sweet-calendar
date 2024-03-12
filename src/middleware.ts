import type { NextRequest } from 'next/server'

const protectedRoutes = [
    '/admin/edit'
]

export function middleware(request: NextRequest) {
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        const token = request.cookies.get('token')?.value

        console.log('token', token)

        return Response.redirect(new URL('/admin/login', request.url))
    }
}