import { getAppointments } from "@/app/actions/calendar"
import AppointmentList from "@/app/components/admin/appointmentList"
import { Appointment } from "@/app/models/appointment";

export default async function Dashboard() {

    const appointments = await getAppointments() as Appointment[];

    return (
        <>
            <h1>My Calendar</h1>
            <p className="mb-4">Here you can manage your calendar and add/delete new appointments.</p>
            <AppointmentList initAppointments={appointments} />
        </>
    )
}