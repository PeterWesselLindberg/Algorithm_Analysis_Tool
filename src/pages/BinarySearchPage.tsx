import AnimationManager from "../components/AnimationManager"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import visualItems from "../utils/visualItems"

const BinarySearchPage = () => {
  const [selectedTab, setSelectedTab] = useState(visualItems[1])

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Binary search</h1>
      
      {selectedTab === visualItems[1] && (<AnimationManager input={generateRandomArray(15)} algorithm="bubble" visualizationGraphics="list/bar" />
      )}

      {selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default BinarySearchPage