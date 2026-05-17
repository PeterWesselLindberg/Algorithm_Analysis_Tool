import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"


const MergeSortPage = () => {
  const [selectedTab, setSelectedTab] = useState("Visualizer")

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Merge sort</h1>
      
      {selectedTab === "Visualizer" && (<AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="merge" sortingGraphics="list/bar" />
      )}

      {selectedTab === "Readme.md" && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default MergeSortPage