"use client"

import { useState } from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"
import { far } from "@fortawesome/free-regular-svg-icons"
import { createAppointment, deleteAppointment } from "@/app/actions/calendar"
import { Appointment } from '@/app/models/appointment'
import Button from "@/app/components/general/button"
import Input from "@/app/components/general/form/input"

export default function AppointmentList({ initAppointments }: { initAppointments: Appointment[] }) {
    const [appointments, setAppointments] = useState(initAppointments)

    const addAppointment = async (formData: FormData) => {
        if (!formData.get('title') || !formData.get('date')) {
            return false
        }

        const title = String(formData.get('title'))
        const date = new Date(String(formData.get('date')))
        const newAppointment = await createAppointment(title, date)

        setAppointments([...appointments, newAppointment])

        // reset form
        const form = document.querySelector('form#add-appointment-form') as HTMLFormElement
        if (form) {
            form.reset()
        }
    }

    const removeAppointment = async (appointment: Appointment) => {
        const newAppointments = await deleteAppointment(appointment.uuid)
        setAppointments(newAppointments)
    }

    return (
        <div className="rounded-lg shadow border-2 w-full bg-white p-4">
            {appointments.length === 0
                ? <div className="text-center mb-4">There are currently no appointments!</div>

                : <div className="grid grid-cols-2 gap-2 p-2 w-full rounded-lg bg-gray-200 overflow-hidden mb-4">
                    {appointments.map((appointment) => (
                        <div key={appointment.uuid} className="flex items-center rounded-lg shadow border-2 bg-white p-4">
                            <div className="grow">
                                <h2 className="grow text-lg font-bold">{appointment.title}</h2>
                                <p className="text-sm">{appointment.date.toLocaleDateString()}</p>
                            </div>
                            <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={() => { removeAppointment(appointment) }}><FaIcon icon={far.faTrashCan} /></Button>
                        </div>
                    ))}
                </div>
            }

            <form id="add-appointment-form" action={addAppointment} className="flex justify-center">
                <Input type="text" placeholder="Add a new Appointment" name="title" required className="me-3" />
                <Input type="date" name="date" required className="me-3" />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600"><FaIcon icon={far.faAppointmentPlus} /></Button>
            </form>
        </div>
    )
}