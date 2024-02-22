import { getCalendars } from "@/app/actions/calendar"
import CalendarList from "@/app/components/admin/calendarList"
import { Calendar } from "@/app/models/calendar"
import { dummyUser } from "@/dummyData"

export default async function Dashboard() {

    const calendars = await getCalendars(dummyUser) as Calendar[];

    return (
        <main className="container flex min-h-screen flex-col items-center p-4 mx-auto">
            <h1>My Calendars</h1>
            <p className="mb-4">Here you can manage your calendars</p>
            <CalendarList initCalendars={calendars} />
        </main>
    )
}