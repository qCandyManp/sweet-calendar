import { MouseEventHandler } from 'react';

export default function Button({
    type,
    className,
    children,
    onClick,
}: Readonly<{
    type: "button" | "submit" | "reset" | undefined,
    className?: string,
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>;
}>) {
    return (
        <button type={type} onClick={onClick} className={`text-white font-bold py-2 px-4 rounded-lg ${className}`}>
            {children}
        </button>
    )
}