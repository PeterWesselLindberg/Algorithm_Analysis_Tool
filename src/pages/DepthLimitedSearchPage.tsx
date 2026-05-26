import AnimationManager from "../components/AnimationManager"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import visualItems from "../utils/visualItems"

const DepthLimitedSearchPage = () => {
  const [selectedTab, setSelectedTab] = useState(visualItems[1])
  const {values , target} = generateRandomBalancedValues(15, false, true)

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Depth limited search</h1>
      
      {selectedTab === visualItems[1] && (<AnimationManager input={{type: "bst", values, target}}
            algorithm="depthLimitedSearch" visualizationGraphics="TVList/tree" />
      )}

      {selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default DepthLimitedSearchPage