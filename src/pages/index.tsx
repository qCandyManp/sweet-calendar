import type { Metadata } from "next";

import Calendar from "@/app/components/calendar"
import DefaultLayout from "@/app/layouts/default";

export const metadata: Metadata = {
    title: "Sweet Calendar",
    description: "My sweet calendar app, written in Next.js 14",
};

export default function Home() {
    return (
        <main className="container flex min-h-screen flex-col items-center p-2 mx-auto">
            <Calendar />
        </main>
    );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
    return <DefaultLayout>{page}</DefaultLayout>;
}