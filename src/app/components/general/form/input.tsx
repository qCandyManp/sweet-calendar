export default function Input({
    type = "text",
    className,
    placeholder,
    name,
    required,
}: Readonly<{
    type: "text" | "password" | "email" | "number" | "date" | "time" | "datetime-local" | "month" | "week" | "url" | "tel" | "search" | "color" | "range" | "file" | "hidden" | "image" | "submit" | "reset" | "button" | undefined,
    className?: string,
    placeholder?: string,
    name: string,
    required?: boolean,
}>) {
    return (
        <input type={type} name={name} placeholder={placeholder} required={required} className={`border-2 rounded-lg appearance-none bg-transparent py-2 px-4 text-base focus:outline-none sm:text-sm sm:leading-6 ${className}`} />
    )
}