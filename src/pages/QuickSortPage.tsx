import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"


const QuickSortPage = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleSelectItem = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div>
      <TopNavBar onSelectItem={handleSelectItem}/>
      <h1>Quick sort</h1>
      { isVisible ? (
      <AnimationManager algorithm="quick" sortingGraphics="list/bar" />
      ) : (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default QuickSortPage