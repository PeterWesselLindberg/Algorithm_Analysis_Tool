import { useState } from "react"
import { Nav} from "react-bootstrap"

interface TopNavBarProps {
    items: string[]
    onSelectItem: () => void
}

const TopNavBar = ({items, onSelectItem} : TopNavBarProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    return (
        // <Navbar className="sidebar-navbar">
            <Nav className="sidebar-navbar" variant="tabs" defaultActiveKey={"Visualizer-" + "0"} >
                {items.map((item, index) => (
                    <Nav.Item> 
                        <Nav.Link 
                            eventKey={"Visualizer-" + index.toString()}
                            onClick={() => {onSelectItem(); setCurrentIndex(index)}}
                            disabled={currentIndex === index}
                        > {item} 
                        </Nav.Link>
                    </Nav.Item>
                ))}
                    
            </Nav>
        // </Navbar>
    )
}
{/* <Nav.Item>
                    <Nav.Link eventKey="Visualizer" disabled={!isDisabled} onClick={() => {onSelectItem(); setIsDisabled(false)}}>Visualizer</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Readme" disabled={isDisabled} onClick={() => {onSelectItem(); setIsDisabled(true)}}>Readme.md</Nav.Link>
                </Nav.Item> */}
export default TopNavBar