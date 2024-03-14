"use client"

import { registerUser } from "@/app/actions/user"
import Button from "@/app/components/general/button"
import Input from "@/app/components/general/form/input"
import { useState } from "react"
import Link from "next/link"

export default function Login() {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    async function register(formData: FormData) {
        if (!formData.get('email') || !formData.get('password') || !formData.get('password-repeat')) {
            return false
        }

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const passwordRepeat = formData.get('password-repeat') as string;

        const response = await registerUser(email, password, passwordRepeat)

        if (response.error) {
            setError(response.error)

            return false
        }

        if (response.success) {
            setSuccess(response.success)
        }
    }

    return (
        <div className="text-center rounded-lg shadow border-2 bg-white p-4">
            <h1 className="text-lg font-bold mb-4">Register</h1>
            {success &&
            <>
                <p className="text-green-500"><b>Success!</b> Please contact the System-Administrator to activate your User!</p>
                <Link href="/admin/login" className="text-blue-500 hover:text-blue-700 underline">Login</Link>
            </>
            }
            {!success &&
            <form action={register} className="flex flex-col gap-2">
                {error && <p className="text-red-500">{error}</p>}
                <Input type="email" name="email" placeholder="Email" required />
                <Input type="password" name="password" placeholder="Password" required />
                <Input type="password" name="password-repeat" placeholder="Repeat password" required />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Login</Button>
            </form>
            }
        </div>
    )
}