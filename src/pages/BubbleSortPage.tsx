import AnimationManager from "../components/AnimationManager"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import visualItems from "../utils/visualItems"

const BubbleSortPage = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleSelectItem = () => {
    setIsVisible((prev) => !prev)
  }


  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={handleSelectItem}/>
      <h1>Bubble sort</h1>
      { isVisible ? (
      <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="bubble" sortingGraphics="list/bar" />
      ) : (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default BubbleSortPage