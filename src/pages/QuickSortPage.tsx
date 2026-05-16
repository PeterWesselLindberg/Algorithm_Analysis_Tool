import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"


const QuickSortPage = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleSelectItem = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={handleSelectItem}/>
      <h1>Quick sort</h1>
      { isVisible ? (
      <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="quick" sortingGraphics="list/bar" />
      ) : (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default QuickSortPage