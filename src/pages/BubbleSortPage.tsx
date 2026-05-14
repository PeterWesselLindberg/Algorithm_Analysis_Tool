import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"


const BubbleSortPage = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleSelectItem = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div>
      <TopNavBar onSelectItem={handleSelectItem}/>
      <h1>Bubble sort</h1>
      { isVisible ? (
      <AnimationManager algorithm="bubble" sortingGraphics="list/bar" />
      ) : (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default BubbleSortPage