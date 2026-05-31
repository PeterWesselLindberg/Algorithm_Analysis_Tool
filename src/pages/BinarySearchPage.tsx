import AnimationManager from "../components/AnimationManager"
import { generateRandomArrayWithTarget } from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import visualItems from "../utils/visualItems"

const BinarySearchPage = () => {
  const [selectedTab, setSelectedTab] = useState(visualItems[1])

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Binary search</h1>
      
      { selectedTab === visualItems[1] && (
        <AnimationManager input={generateRandomArrayWithTarget(15)} algorithm="binarySearch" visualizationGraphics="TList/bar" />
      )}

      { selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default BinarySearchPage