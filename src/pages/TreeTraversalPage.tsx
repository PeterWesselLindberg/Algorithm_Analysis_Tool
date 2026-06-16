import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import { addToList, oneItem } from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import type { AlgorithmInput } from "../types/algorithmtypes"
import Algo from "../types/algoType"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"


const TreeTraversalPage = () => {
  
  const items: string[] = addToList(oneItem, ["Inorder tree traversal", "Postorder tree traversal", "Preorder tree traversal"])
  const header: string = "Depth first search (DFS)"

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const exampleTree: AlgorithmInput = { type: "array", data: [1,2,3,4,5,6,7]} 

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }
  
  return (
    <div>
      <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/> 
      
      { selectedTab === 1 &&  (
        <>
          <h1>Inorder tree traversal</h1>
          <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.Inorder} visualizationGraphics={Visualization.ListTree}
          structure={StructureColor.TraversalColor} />
        </>
      )} 

      { selectedTab === 2 &&  (
        <>
          <h1>Postorder tree traversal</h1>
          <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.PostOrder} visualizationGraphics={Visualization.ListTree}
          structure={StructureColor.TraversalColor} />
        </>
      )} 

      { selectedTab === 3 &&  (
        <>
          <h1>Preorder tree traversal</h1>
          <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.PreOrder} visualizationGraphics={Visualization.ListTree}
          structure={StructureColor.TraversalColor} />
        </>
      )} 

      {selectedTab === 0 && (
        <>
                    <h1>{header}</h1>
                    <p>Tree traversal algorithms are algorithms used for visiting each node in a tree data structure.</p>
                    
                    <h3>Inorder tree traversal</h3>
                    <p>In inorder tree traversal. It traverses each node by first traversing the node's left subtree then the node itself and finally it traverses the right subtree.</p>
                    <AnimationManager input={exampleTree} algorithm={Algorithm.Inorder} visualizationGraphics={Visualization.ListTree}
                        isInAbout={true} />
                    
                    <h3 className="v-space">Postorder tree traversal</h3>
                    <p>In postorder tree traversal. It traverses each node by first traversing the node's left subtree then the node's right subtree and the node itself.</p>
                    <AnimationManager input={exampleTree} algorithm={Algorithm.PostOrder} visualizationGraphics={Visualization.ListTree}
                        isInAbout={true} />

                    
                    <h3 className="v-space">Preorder tree traversal</h3>
                    <p>In preorder tree traversal. It traverses each node by first visiting the node itself, then traversing it's left subtree and then finally traversing the right subtree.</p>
                    <AnimationManager input={exampleTree} algorithm={Algorithm.PreOrder} visualizationGraphics={Visualization.ListTree}
                        isInAbout={true} />
                    
                    
                    <h2 className="v-space">Time complexity</h2>
                    <p>The time complexity for tree traversal is O(n).</p>
                    
                    <h2>Space complexity</h2>
                    <p>The space complexity for tree tracersal is O(h), where h is the height of the tree.</p>
                    
                    <h4 className="v-space">Complexity table</h4>
                    <ComplexityTable algoType={Algo.Traversal} dataType={DataStructure.Tree} name={header} worst={"O(n)"} memory={"O(h)"}/>


                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Tree_traversal" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/inorderTraversal.ts" target="_blank">
                        Inorder tree traversal</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/postorderTraversal.ts" target="_blank">
                        Postorder tree traversal</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/preorderTraversal.ts" target="_blank">
                        Preorder tree traversal</a>
                </>
      )}
    </div>
  )
}

export default TreeTraversalPage