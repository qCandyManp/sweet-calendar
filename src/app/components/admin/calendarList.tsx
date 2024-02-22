"use client"

import { Calendar } from "@/app/models/calendar";
import { useState } from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"
import { far } from "@fortawesome/free-regular-svg-icons"
import { createCalendar } from "@/app/actions/calendar";
import { dummyUser } from "@/dummyData";
import Button from "@/app/components/general/button";
import Input from "@/app/components/general/form/input";

export default function CalendarList({ initCalendars }: { initCalendars: Calendar[] }) {
    const [calendars, setCalendars] = useState(initCalendars)

    const addCalendar = async (formData: FormData) => {
        console.log(formData.get('title'))
        if (!formData.get('title')) {
            return false
        }

        const title = String(formData.get('title'))
        const newCalendar = await createCalendar(dummyUser, title)

        setCalendars([...calendars, newCalendar])
    }

    return (
        <div className="rounded-lg shadow border-2 w-full bg-white p-4">
            <div className="grid grid-cols-4 gap-2 p-2 w-full rounded-lg bg-gray-200 overflow-hidden mb-4">
                {calendars.length === 0 && <p>No calendars found</p>}
                {calendars.map((calendar) => (
                    <div key={calendar.uuid} className="rounded-lg shadow border-2 w-full bg-white p-4">
                        <h2>{calendar.title}</h2>
                    </div>
                ))}
            </div>
            <form action={addCalendar} className="flex justify-center">
                <Input type="text" placeholder="Add a new Calendar" name="title" required className="me-3"/>
                <Button type="submit"><FaIcon icon={far.faCalendarPlus}/></Button>
            </form>
        </div>
    )
}