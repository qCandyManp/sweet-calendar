import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome'
import * as far from '@fortawesome/free-regular-svg-icons'

import type { Metadata } from "next";

import Calendar from "@/app/components/calendar"

export const metadata: Metadata = {
    title: "Sweet Calendar",
    description: "My sweet calendar app, written in Next.js 14",
};

export default async function Home() {
    const date = new Date()

    return (
        <main className="container flex min-h-screen flex-col items-center p-4 mx-auto">
            <h1 className='text-2xl mb-6'>
                <FaIcon icon={far.faCalendar} /> Calendar
            </h1>
            <Calendar initDate={date} />
        </main>
    );
}
