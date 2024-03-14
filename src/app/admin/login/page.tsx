"use client"

import { loginUser } from "@/app/actions/user"
import Button from "@/app/components/general/button"
import Input from "@/app/components/general/form/input"
import { useState } from "react"
import { redirect } from 'next/navigation'
import Link from "next/link"

export default function Login() {
    const [error, setError] = useState<string | null>(null)

    async function authenticate(formData: FormData) {
        if (!formData.get('email') || !formData.get('password')) {
            return false
        }

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const response = await loginUser(email, password)

        if (response.error) {
            setError(response.error)

            return false
        }

        if (response.token) {
            // set cookie for future requests
            document.cookie = `token=${response.token}; path=/;`

            return redirect('/admin/edit')
        }
    }

    return (
        <div className="text-center rounded-lg shadow border-2 bg-white p-4">
            <h1 className="text-lg font-bold mb-4">Login</h1>
            <form action={authenticate} className="flex flex-col gap-2">
                {error && <p className="text-red-500">{error}</p>}
                <Input type="email" name="email" placeholder="Email" required />
                <Input type="password" name="password" placeholder="Password" required />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Login</Button>
            </form>
            <div className="mt-4 flex flex-col">
                <Link href="/admin/register" className="text-blue-500 hover:text-blue-700 underline">Register</Link>
                <Link href="/admin/reset-password" className="text-blue-500 hover:text-blue-700 underline">Forgot Password</Link>
            </div>
        </div>
    )
}