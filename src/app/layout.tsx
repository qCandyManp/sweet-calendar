import "@/css/globals.css"

export default function DefaultLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
            <body>
                <main className="container flex min-h-screen flex-col items-center p-4 mx-auto">
                    {children}
                </main>
            </body>
        </html>
    );
}
