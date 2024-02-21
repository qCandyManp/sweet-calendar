"use server"

import { Day } from '@/types/calendar/day'

const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

const getNumberOfDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getDayGrid = (date: Date) => {
    const firstDay = getFirstDayOfMonth(date)
    const lastDay = getLastDayOfMonth(date)
    const numberOfDays = getNumberOfDaysInMonth(date)
    const dayGrid = []

    for (let i = 0; i < firstDay.getDay(); i++) {
        dayGrid.push({
            day: null,
            blocked: false
        } as Day)
    }

    for (let i = 1; i <= numberOfDays; i++) {
        dayGrid.push({
            day: i,
            blocked: false
        } as Day)
    }

    for (let i = lastDay.getDay(); i < 6; i++) {
        dayGrid.push({
            day: null,
            blocked: false
        } as Day)
    }

    return dayGrid
}

export async function POST(request: Request) {
    const { dateStr } = await request.json() as { dateStr: string }

    const date = !dateStr ? new Date() : new Date(dateStr)

    return Response.json({ days: getDayGrid(date) })
}