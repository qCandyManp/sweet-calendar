"use server"

import { Day } from '@/app/types/calendar'
import { getDayGrid } from '@/app/utils/date'
import { User } from '@/app/models/user'
import { Calendar } from '@/app/models/calendar'
import { getPGClient } from '../utils/db'

export async function getDays(date: Date = new Date()): Promise<Day[]> {
    return getDayGrid(date)
}

export async function getCalendars(user: User): Promise<Calendar[]> {

    const client = getPGClient()

    try {
        await client.connect()
    } catch (e) {
        console.error(e)
    }

    // TODO: restrict to user
    const result = await client.query('SELECT * FROM calendars')

    return result.rows.map((row: any) => row as Calendar)
}

export async function createCalendar(user: User, title: string): Promise<Calendar> {
    const client = getPGClient()

    try {
        await client.connect()
    } catch (e) {
        console.error(e)
    }

    const result = await client.query('INSERT INTO calendars (title, owner) VALUES ($1, $2) RETURNING *', [title, user.uuid])

    return result.rows[0] as Calendar
}