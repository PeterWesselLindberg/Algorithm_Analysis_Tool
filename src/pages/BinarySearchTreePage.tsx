import AnimationManager from "../components/AnimationManager"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import {oneItem, addToList} from "../utils/visualItems"

const BinarySearchTreePage = () => {
  
  const visualItems = addToList(oneItem, ["Insertion", "BFS search", "DFS search"])

  const [selectedTab, setSelectedTab] = useState(visualItems[1])

  // const vals = [5, 2, 8, 1, 3, 7, 6,10,4,12,13,9,11]
  // const t = 7
  const {values , target} = generateRandomBalancedValues(10, false, true)

    return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
      
      {selectedTab === visualItems[1] && (
        <>
          <h1>Binary search tree Insertion</h1>
          <AnimationManager input={generateRandomArray(5)} algorithm="bstInsertion" visualizationGraphics="exList/tree" />
        </>
      )}

      {selectedTab === visualItems[2] && (
        <>
          <h1>Binary search tree breadth-first search</h1>
          <AnimationManager input={{type: "bst", values, target}}
            algorithm="bfsTreeSearch" visualizationGraphics="TVList/tree" />
        </>
      )}

      {selectedTab === visualItems[3] && (
        <>
        <h1>Binary search tree depth-first search</h1>
        <AnimationManager input={{type: "bst", values, target}}
          algorithm="dfsTreeSearch" visualizationGraphics="TVList/tree" />
       </>
      )}

      {selectedTab === visualItems[0] && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default BinarySearchTreePage