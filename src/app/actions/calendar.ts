"use server"

import { Day } from '@/app/types/calendar'
import { getDayGrid } from '@/app/utils/date'
import { Appointment } from '@/app/models/appointment'
import { getPGClient } from '../utils/db'

export async function getDays(date: Date = new Date()): Promise<Day[]> {
    return getDayGrid(date)
}

export async function getAppointments(): Promise<Appointment[]> {

    const client = getPGClient()

    try {
        await client.connect()
    } catch (e) {
        console.error(e)
    }

    const result = await client.query('SELECT * FROM appointments ORDER BY date ASC')
    await client.end()

    return result.rows.map((row: any) => row as Appointment)
}

export async function createAppointment(title: string, date: Date): Promise<Appointment> {
    const client = getPGClient()

    try {
        await client.connect()
    } catch (e) {
        console.error(e)
    }

    const result = await client.query('INSERT INTO appointments (title, date) VALUES ($1, $2) RETURNING *', [title, date])
    await client.end()

    return result.rows[0] as Appointment
}

export async function deleteAppointment(uuid: string): Promise<Appointment[]> {
    const client = getPGClient()

    try {
        await client.connect()
    } catch (e) {
        console.error(e)
    }

    await client.query('DELETE from appointments WHERE uuid=$1', [uuid])
    const result = await client.query('SELECT * FROM appointments ORDER BY date ASC')
    await client.end()

    return result.rows.map((row: any) => row as Appointment)
}