"use server"

import { User } from '@/app/models/user'
import { getPGClient } from '@/app/utils/db'
import { comparePassword, generateToken, hashPassword } from '@/app/utils/auth'

export async function registerUser(email: string, password: string): Promise<{ success?: boolean, error?: string }> {
    const client = getPGClient()
    await client.connect()

    const result = await client.query('SELECT * FROM users WHERE email = $1', [email])

    if (result.rowCount) {
        return { error: 'User already exists' }
    }

    const hashedPassword = await hashPassword(password)

    await client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword])

    return { success: true }
}

export async function loginUser(email: string, password: string): Promise<{ token?: string, error?: string }> {
    const client = getPGClient()
    await client.connect()

    const result = await client.query('SELECT * FROM users WHERE email = $1', [email])

    if (!result.rowCount) {
        return { error: 'User not found' }
    }

    const user = result.rows[0] as User

    if (!user.verified) {
        return { error: 'User not released' }
    }

    if (await comparePassword(password, user.password)) {
        return { error: 'Invalid password' }
    }

    return { token: generateToken(user) }
}
