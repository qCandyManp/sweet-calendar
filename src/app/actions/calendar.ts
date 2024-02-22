"use server"

import { Day } from '@/app/types/calendar'
import { getDayGrid } from '@/app/utils/date'

export async function getDays(date: Date = new Date()): Promise<Day[]> {
    return getDayGrid(date)
}