import React from 'react'

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string
    color: string
    bordercolor?: string
    bgcolor?: string
    className?: string
}

const Button = ({ text, color, bordercolor, bgcolor, className, ...props }: ButtonProps) => {
    return (
        <div
            className={`px-4 py-1 cursor-pointer rounded-lg ${bordercolor && 'border-2'}  ${className}`}
            style={{
                borderColor: bordercolor ? bordercolor : "#ffff",
                backgroundColor: bgcolor,
            }}
            {...props}
        >
            <span style={{ color: color }}>
                {text}
            </span>
        </div>
    )
}

export default Button
