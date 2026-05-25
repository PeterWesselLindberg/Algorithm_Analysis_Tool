import AnimationManager from "../components/AnimationManager"
import generateRandomValue from "../randGen/generateRandomValue"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import {oneItem, addToList} from "../utils/visualItems"

const BinarySearchTreePage = () => {
  
  const visualItems = addToList(oneItem, ["Insertion", "BFS search", "DFS search"])

  const [selectedTab, setSelectedTab] = useState(visualItems[1])

  const values = [5, 2, 8, 1, 3, 7, 6,10,4,12,13,9,11]
  const target = 7
  
    return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      <h1>Binary search tree</h1>
      
      {selectedTab === visualItems[1] && (<AnimationManager input={generateRandomArray(5)}
       algorithm="bstInsertion" visualizationGraphics="list/exTree" />
      )}

      {selectedTab === visualItems[2] && (<AnimationManager input={{type: "bst", values, target}}
       algorithm="bfsTreeSearch" visualizationGraphics="TVList/tree" />
      )}

      {selectedTab === visualItems[3] && (<AnimationManager input={{type: "bst", values, target}}
       algorithm="dfsTreeSearch" visualizationGraphics="TVList/tree" />
      )}

      {selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default BinarySearchTreePage