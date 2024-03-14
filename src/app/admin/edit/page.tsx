"use server"

import { getAppointments } from "@/app/actions/calendar"
import AppointmentList from "@/app/components/admin/appointmentList"
import { Appointment } from "@/app/models/appointment"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { User } from "next-auth"
import { authenticateByCookies } from "@/app/utils/auth"

export default async function Dashboard() {
    const user = authenticateByCookies(cookies()) as User | false

    if (!user) {
        redirect('/admin/login')
    }

    const appointments = await getAppointments() as Appointment[];

    return (
        <>
            <h1>My Calendar</h1>
            <p className="mb-4">Here you can manage your calendar and add/delete new appointments.</p>
            <AppointmentList initAppointments={appointments} />
        </>
    )
}