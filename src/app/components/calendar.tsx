import Navigation from '@/app/components/calendar/navigation'

import { Day } from '@/types/calendar/day'

import { useState } from 'react';

const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

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

export default function Calendar() {
    const [date, setDate] = useState(new Date())

    return (
        <div className="rounded-lg shadow border-2 w-full bg-white p-4">
            <Navigation />
            <div className="flex items-center w-full rounded-t-lg border-0 overflow-hidden">
                {weekdays.map((day, index) =>
                    <div key={index} className="flex-1 text-center bg-gray-200 p-4 font-bold">
                        {day}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-7 gap-2 p-2 w-full rounded-b-lg bg-gray-200 overflow-hidden">
                {getDayGrid(date).map((Day, index) =>
                    <div key={index} className={`flex rounded-lg justify-center flex-col text-just text-center aspect-square p-4 ${Day.blocked ? 'bg-red text-white' : 'bg-gray-300'} ${Day.day == null ? 'opacity-30' : ''}`}>
                        <span className='text-2xl font-bold'>{Day.day ?? ''}</span>
                    </div>
                )}
            </div>
        </div>
    );
}