import { useState} from "react"
import { Nav} from "react-bootstrap"
import { useSearchParams } from "react-router-dom"

interface TopNavBarProps {
    items: string[]
    onSelectItem: (item: string, index: number) => void
}

const TopNavBar = ({items, onSelectItem} : TopNavBarProps) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const initialIndex = Number(searchParams.get("tab")) || 1
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    const handleSelect = (index: number, item: string) => {
        setCurrentIndex(index)
        setSearchParams({ tab: index.toString() })
        onSelectItem(item, index)
    }

    return (
        <Nav className="sidebar-navbar" variant="tabs" defaultActiveKey={"Visualizer-" + currentIndex} >
            {items.map((item, index) => (
                <Nav.Item key={index.toString()}> 
                    <Nav.Link 
                        eventKey={"Visualizer-" + index.toString()}
                        onClick={() => handleSelect(index, item)}
                        disabled={currentIndex === index}
                    > {item} 
                    </Nav.Link>
                </Nav.Item>
            ))}
                
        </Nav>

    )
}
export default TopNavBar