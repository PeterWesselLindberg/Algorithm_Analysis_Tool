import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"


const InsertionSortPage = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleSelectItem = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div>
      <TopNavBar onSelectItem={handleSelectItem}/>
      <h1>Insertion sort</h1>
      { isVisible ? (
      <AnimationManager unsortedNumbers={[5,2,8,1,6,1,2,4,6,7,8,10]} algorithm="insertion" sortingGraphics="list/bar" />
      ) : (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default InsertionSortPage