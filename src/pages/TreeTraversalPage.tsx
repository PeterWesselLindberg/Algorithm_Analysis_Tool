import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"


const TreeTraversalPage = () => {
  const [selectedTab, setSelectedTab] = useState("In order tree traversal")
  const items = ["Readme.md", "In order tree traversal", "Post order tree traversal", "Pre order tree traversal"]

  return (
    <div>
      <TopNavBar items={items} onSelectItem={setSelectedTab}/>
      
      { selectedTab === "In order tree traversal" &&  (
        <>
            <h1>In order tree traversal</h1>
            <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="inorderTraversal" sortingGraphics="list/tree" />
        </>
      )} 

      { selectedTab === "Post order tree traversal" &&  (
        <>
            <h1>Post order tree traversal</h1>
            <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="postorderTraversal" sortingGraphics="list/tree" />
        </>
      )} 

      { selectedTab === "Pre order tree traversal" &&  (
        <>
            <h1>Pre order tree traversal</h1>
            <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="preorderTraversal" sortingGraphics="list/tree" />
        </>
      )} 

      {selectedTab === "Readme.md" && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default TreeTraversalPage