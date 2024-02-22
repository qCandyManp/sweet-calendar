"use client"

import { Calendar } from "@/app/models/calendar";
import { useState } from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"
import { far } from "@fortawesome/free-regular-svg-icons"
import { createCalendar, deleteCalendar } from "@/app/actions/calendar";
import { dummyUser } from "@/dummyData";
import Button from "@/app/components/general/button";
import Input from "@/app/components/general/form/input";

export default function CalendarList({ initCalendars }: { initCalendars: Calendar[] }) {
    const [calendars, setCalendars] = useState(initCalendars)

    const addCalendar = async (formData: FormData) => {
        if (!formData.get('title')) {
            return false
        }

        const title = String(formData.get('title'))
        const newCalendar = await createCalendar(dummyUser, title)

        setCalendars([...calendars, newCalendar])
    }

    const removeCalendar = async (calendar: Calendar) => {
        const newCalendars = await deleteCalendar(dummyUser, calendar.uuid)
        setCalendars(newCalendars)
    }

    const openModal = (calendar: Calendar) => {
        // Todo: open modal
    }

    return (
        <div className="rounded-lg shadow border-2 w-full bg-white p-4">
            <div className="grid grid-cols-2 gap-2 p-2 w-full rounded-lg bg-gray-200 overflow-hidden mb-4">
                {calendars.length === 0 && <p>No calendars found</p>}
                {calendars.map((calendar) => (
                    <div key={calendar.uuid} className="flex items-center rounded-lg shadow border-2 bg-white p-4">
                        <h2 className="grow text-lg font-bold">{calendar.title}</h2>
                        <Button type="button" className="bg-blue-500 hover:bg-blue-600 me-3" onClick={() => { openModal(calendar) }}><FaIcon icon={far.faEdit} /></Button>
                        <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={() => { removeCalendar(calendar) }}><FaIcon icon={far.faTrashCan} /></Button>
                    </div>
                ))}
            </div>
            <form action={addCalendar} className="flex justify-center">
                <Input type="text" placeholder="Add a new Calendar" name="title" required className="me-3" />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600"><FaIcon icon={far.faCalendarPlus} /></Button>
            </form>
        </div>
    )
}