import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import visualItems from "../utils/visualItems"

const FibonacciPage = () => {
  const [selectedTab, setSelectedTab] = useState(visualItems[1])

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>The fibonacci sequence</h1>
      { selectedTab === visualItems[1] && (
        <AnimationManager input={{type: "array", data: [16]}} algorithm="fibonacci" visualizationGraphics="list" />
      )}
    
      {selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default FibonacciPage