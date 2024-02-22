import { Day } from '@/app/types/calendar'

export const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export const getNumberOfDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const getDayGrid = (date: Date): Day[] => {
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