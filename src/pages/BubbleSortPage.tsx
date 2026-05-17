import AnimationManager from "../components/AnimationManager"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import visualItems from "../utils/visualItems"

const BubbleSortPage = () => {
  const [selectedTab, setSelectedTab] = useState("Visualizer")

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Bubble sort</h1>
      
      {selectedTab === "Visualizer" && (<AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="bubble" sortingGraphics="list/bar" />
      )}

      {selectedTab === "Readme.md" && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default BubbleSortPage