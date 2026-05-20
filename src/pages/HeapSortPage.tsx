import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems, { addToList } from "../utils/visualItems"

const arrCopy = addToList(visualItems, ["Visualizer without heap"])

const HeapSortPage = () => {
  const [selectedTab, setSelectedTab] = useState("Visualizer")
  

  return (
    <div>
      <TopNavBar items={arrCopy} onSelectItem={setSelectedTab}/>
      <h1>Heap sort</h1>
      { selectedTab === "Visualizer" &&  (
      <AnimationManager input={generateRandomArray(15)} algorithm="heap" visualizationGraphics="list/bar/tree" />
      )} 
      
      { selectedTab === "Visualizer without heap" &&  (
      <AnimationManager input={generateRandomArray(15)} algorithm="heap" visualizationGraphics="list/bar" />
      )}

      {selectedTab === "Readme.md" && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default HeapSortPage