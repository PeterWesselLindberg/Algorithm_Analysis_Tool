import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"


const MergeSortPage = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleSelectItem = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={handleSelectItem}/>
      <h1>Merge Sort</h1>
      { isVisible ? (
      <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="merge" sortingGraphics="list/bar" />
      ) : (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default MergeSortPage