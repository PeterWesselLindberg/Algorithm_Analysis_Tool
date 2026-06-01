import { useState } from "react"
import { Nav} from "react-bootstrap"

interface TopNavBarProps {
    items: string[]
    onSelectItem: (item: string) => void
}

const TopNavBar = ({items, onSelectItem} : TopNavBarProps) => {
    const [currentIndex, setCurrentIndex] = useState(1)
    return (
        <Nav className="sidebar-navbar" variant="tabs" defaultActiveKey={"Visualizer-" + "1"} >
            {items.map((item, index) => (
                <Nav.Item> 
                    <Nav.Link 
                        eventKey={"Visualizer-" + index.toString()}
                        onClick={() => {onSelectItem(item); setCurrentIndex(index)}}
                        disabled={currentIndex === index}
                    > {item} 
                    </Nav.Link>
                </Nav.Item>
            ))}
                
        </Nav>

    )
}
export default TopNavBar