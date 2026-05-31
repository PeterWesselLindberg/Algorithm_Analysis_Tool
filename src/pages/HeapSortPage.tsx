import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems, { addToList } from "../utils/visualItems"

const items = addToList(visualItems, ["Visualizer without heap"])

const HeapSortPage = () => {
  const [selectedTab, setSelectedTab] = useState(items[1])
  

  return (
    <div>
      <TopNavBar items={items} onSelectItem={setSelectedTab}/>
      <h1>Heap sort</h1>
      { selectedTab === items[1] &&  (
        <AnimationManager input={generateRandomArray(15)} algorithm="heap" visualizationGraphics="list/bar/tree" />
      )} 
      
      { selectedTab === items[2] &&  (
        <AnimationManager input={generateRandomArray(15)} algorithm="heap" visualizationGraphics="list/bar" />
      )}

      {selectedTab === items[0] && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default HeapSortPage