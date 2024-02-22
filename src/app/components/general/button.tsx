export default function Button({
    type,
    className,
    color = "blue",
    children
}: Readonly<{
    type: "button" | "submit" | "reset" | undefined,
    className?: string,
    color?: string,
    children: React.ReactNode
}>) {
    return (
        <button type={type} className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded-lg ${className}`}>
            {children}
        </button>
    )
}