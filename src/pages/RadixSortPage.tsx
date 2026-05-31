import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"

const RadixSortPage = () => {
  const [selectedTab, setSelectedTab] = useState(visualItems[1])

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>  
      <h1>Radix sort</h1>
      { selectedTab === visualItems[1] &&  (
        <AnimationManager input={generateRandomArray(15, 1, 999)} algorithm="radix" visualizationGraphics="list/list/list" />
      )}

      { selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default RadixSortPage