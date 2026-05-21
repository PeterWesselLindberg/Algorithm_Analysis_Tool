import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"


const TreeTraversalPage = () => {
  const items = ["Readme.md", "Inorder tree traversal", "Postorder tree traversal", "Preorder tree traversal"]
  const [selectedTab, setSelectedTab] = useState(items[1])
  
  return (
    <div>
      <TopNavBar items={items} onSelectItem={setSelectedTab}/>
      
      { selectedTab === items[1] &&  (
        <>
            <h1>Inorder tree traversal</h1>
            <AnimationManager input={generateRandomArray(15)} algorithm="inorderTraversal" visualizationGraphics="list/tree" />
        </>
      )} 

      { selectedTab === items[2] &&  (
        <>
            <h1>Postorder tree traversal</h1>
            <AnimationManager input={generateRandomArray(15)} algorithm="postorderTraversal" visualizationGraphics="list/tree" />
        </>
      )} 

      { selectedTab === items[3] &&  (
        <>
            <h1>Preorder tree traversal</h1>
            <AnimationManager input={generateRandomArray(15)} algorithm="preorderTraversal" visualizationGraphics="list/tree" />
        </>
      )} 

      {selectedTab === "Readme.md" && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default TreeTraversalPage