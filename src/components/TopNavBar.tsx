import { useState } from "react"
import { Nav } from "react-bootstrap"

interface TopNavBarProps {
    onSelectItem: () => void
}

const TopNavBar = ({onSelectItem} : TopNavBarProps) => {
    const [isDisabled, setIsDisabled] = useState(false)
    return (
        <Nav variant="tabs" defaultActiveKey="Visualizer">
            <Nav.Item>
                <Nav.Link eventKey="Visualizer" disabled={!isDisabled} onClick={() => {onSelectItem(); setIsDisabled(false)}}>Visualizer</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="Readme" disabled={isDisabled} onClick={() => {onSelectItem(); setIsDisabled(true)}}>Readme.md</Nav.Link>
            </Nav.Item>

        </Nav>
)
}

export default TopNavBar