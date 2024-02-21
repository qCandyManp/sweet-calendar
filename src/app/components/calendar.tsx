"use client"

import Navigation from '@/app/components/calendar/navigation'

import { Day } from '@/types/calendar/day'
import { useState } from 'react'
import useSWR from 'swr'

const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

const fetcher = (url: string, dateStr: string) => fetch(url, { method: 'POST', body: JSON.stringify({ dateStr: dateStr }) }).then((res) => res.json()).then((data) => data).catch((error) => console.error(error));

export default function Calendar({ initDate }: { initDate: Date }) {
    const [date, setDate] = useState(initDate)

    const { data, error, isLoading, mutate } = useSWR('/api/calendar', url => fetcher(url, date.toISOString()))

    const doRefresh = (newDate: Date) => {
        mutate({ dateStr: newDate.toISOString() })
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    const days = data?.days as Day[]

    return (
        <div className="rounded-lg shadow border-2 w-full bg-white p-4">
            <Navigation date={date} setDate={setDate} refresh={doRefresh} />
            <div className="flex items-center w-full rounded-t-lg border-0 overflow-hidden">
                {weekdays.map((day, index) =>
                    <div key={index} className="flex-1 text-center bg-gray-200 p-4 font-bold">
                        {day}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-7 gap-2 p-2 w-full rounded-b-lg bg-gray-200 overflow-hidden">
                {(days as Day[]).map((Day, index) =>
                    <div key={index} className={`flex rounded-lg justify-center flex-col text-just text-center aspect-video p-4 ${Day.blocked ? 'bg-red text-white' : 'bg-gray-300'} ${Day.day == null ? 'opacity-30' : ''}`}>
                        <span className='text-2xl font-bold'>{Day.day ?? ''}</span>
                    </div>
                )}
            </div>
        </div>
    );
}