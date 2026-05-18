import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import visualItems from "../utils/visualItems"

const FactorialPage = () => {
  const [selectedTab, setSelectedTab] = useState("Visualizer")

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Nth factorial</h1>
      { selectedTab === "Visualizer" && (
      <AnimationManager unsortedNumbers={[15]} algorithm="factorial" sortingGraphics="list" />
      )}
    
      {selectedTab === "Readme.md" && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default FactorialPage