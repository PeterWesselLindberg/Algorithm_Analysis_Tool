import AnimationManager from "../components/AnimationManager"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import visualItems from "../utils/visualItems"

const RedBlackTreePage = () => {
  const [selectedTab, setSelectedTab] = useState(visualItems[1])

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Red-black search tree</h1>
      
      {selectedTab === visualItems[1] && (<AnimationManager input={generateRandomArray(15)} algorithm="bubble" visualizationGraphics="list/graph" />
      )}

      {selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default RedBlackTreePage