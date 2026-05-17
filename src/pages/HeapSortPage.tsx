import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"
import { addBeforeLastElm } from "../utils/visualItems"

const arrCopy = addBeforeLastElm(visualItems, ["Visualizer without heap"])


const HeapSortPage = () => {
  const [selectedTab, setSelectedTab] = useState("Visualizer")
  

  return (
    <div>
      <TopNavBar items={arrCopy} onSelectItem={setSelectedTab}/>
      <h1>Heap sort</h1>
      { selectedTab === "Visualizer" &&  (
      <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="heap" sortingGraphics="list/bar/tree" />
      )} 
      
      { selectedTab === "Visualizer without heap" &&  (
      <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="heap" sortingGraphics="list/bar" />
      )}

      {selectedTab === "Readme.md" && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default HeapSortPage