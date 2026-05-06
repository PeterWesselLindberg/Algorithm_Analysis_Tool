import type { ReactNode } from "react"

interface ButtonProps {
    children: ReactNode,
    color?: "primary" | "secondary" | "danger" | "info",
    onClick: () => void
}

const Button = ({children, color = 'primary', onClick} : ButtonProps) => {
    
  return (
    <button className={'btn btn-' + color} onClick={onClick}>{children}</button>
  )
}

export default Button