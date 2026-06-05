import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import { addToList, oneItem } from "../utils/visualItems"


const TreeTraversalPage = () => {
  
  const items: string[] = addToList(oneItem, ["Inorder tree traversal", "Postorder tree traversal", "Preorder tree traversal"])

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }
  
  return (
    <div>
      <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/> 
      
      { selectedTab === 1 &&  (
        <>
          <h1>Inorder tree traversal</h1>
          <AnimationManager input={generateRandomArray(15)} algorithm="inorderTraversal" visualizationGraphics="list/tree" />
        </>
      )} 

      { selectedTab === 2 &&  (
        <>
          <h1>Postorder tree traversal</h1>
          <AnimationManager input={generateRandomArray(15)} algorithm="postorderTraversal" visualizationGraphics="list/tree" />
        </>
      )} 

      { selectedTab === 3 &&  (
        <>
          <h1>Preorder tree traversal</h1>
          <AnimationManager input={generateRandomArray(15)} algorithm="preorderTraversal" visualizationGraphics="list/tree" />
        </>
      )} 

      {selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default TreeTraversalPage