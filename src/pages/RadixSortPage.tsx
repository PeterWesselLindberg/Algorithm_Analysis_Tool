import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"

const RadixSortPage = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleSelectItem = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={handleSelectItem}/>  
      <h1>Radix sort</h1>
      { isVisible ? (
      <AnimationManager unsortedNumbers={generateRandomArray(15, 1, 999)} algorithm="radix" sortingGraphics="list/list/list" />
      ) : (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default RadixSortPage