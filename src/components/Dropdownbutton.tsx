import type { ReactNode } from "react"

interface DropdownButtonProps {
    children: ReactNode,
    onClick: () => void
}

const DropdownButton = ({children, onClick} : DropdownButtonProps) => {
    
  return (
    <button className={'btn btn-primary' } onClick={onClick}>{children}</button>
  )
}

export default DropdownButton