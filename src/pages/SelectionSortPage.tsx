import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"


const SelectionSortPage = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleSelectItem = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div>
      <TopNavBar onSelectItem={handleSelectItem}/>
      <h1>Selection sort</h1>
      { isVisible ? (
      <AnimationManager algorithm="selection" sortingGraphics="list/bar" />
      ) : (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default SelectionSortPage