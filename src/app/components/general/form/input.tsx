export default function Input({
    type = "text",
    textColor = "slate",
    borderColor = "slate",
    className,
    placeholder,
    name,
    required,
}: Readonly<{
    type: "text" | "password" | "email" | "number" | "date" | "time" | "datetime-local" | "month" | "week" | "url" | "tel" | "search" | "color" | "range" | "file" | "hidden" | "image" | "submit" | "reset" | "button" | undefined,
    textColor?: string,
    borderColor?: string,
    className?: string,
    placeholder?: string,
    name: string,
    required?: boolean,
}>) {
    return (
        <input type={type} name={name} placeholder={placeholder} required={required} className={`text-${textColor}-900 border-2 rounded-lg border-${borderColor} appearance-none bg-transparent py-2 px-4 text-base placeholder:text-${textColor}-600 focus:outline-none sm:text-sm sm:leading-6 ${className}`} />
    )
}