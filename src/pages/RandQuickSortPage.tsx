import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"

const RandQuickSortPage = () => {
 const [selectedTab, setSelectedTab] = useState(visualItems[1])

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Randomized quick sort</h1>
      
      {selectedTab === visualItems[1] && (
        <AnimationManager input={generateRandomArray(15)} algorithm="rQuick" visualizationGraphics="list/bar" />
      )}

      {selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default RandQuickSortPage