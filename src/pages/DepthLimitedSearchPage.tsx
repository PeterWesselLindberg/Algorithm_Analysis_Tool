import AnimationManager from "../components/AnimationManager"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"
import Algo from "../types/algoType"

const DepthLimitedSearchPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const header: string = "Depth Limited Search"
  const exampleArr: number[] = [21,19,17,27,23,22,29]

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  const {values , target} = generateRandomBalancedValues(31, false, true)

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>{header}</h1>
      
      {selectedTab === 1 && (
        <AnimationManager input={{type: "bst", values, target}}
          algorithm={Algorithm.DepthLimitedSearch} visualizationGraphics={Visualization.TVListTree}
          structure={StructureColor.TraversalColor} />
      )}

      {selectedTab === 0 && (
        <>
          <p>
            Depth limited search is a variation of DFS search of a BST, which similar to DFS go as deep as possible along each branch before moving on to the next branch.<br/>
            It starts at the root and visits every node in a tree until the targeted node's position is either found or not found.<br/>
            The main difference between a depth limited search and a normal DFS search is that a depth limited search stops once it reaches a specific layer of the tree.<br/>
            If the value is not found before reaching the set depth limit and having gone through all nodes on that layer, the algorithm stops.
          </p>

          <h2>Time complexity</h2>
          <p>
            The running time of a depth limited search on a BST is O(1), in the best case where the root is the target. Otherwise it has running time of O(n).
          </p>

          <h2>Storage complexity</h2>
          <p>
            The storage required of a depth limited search on a BST is O(L) in the worst case, where L is the set depth limit of the BST.<br/>
            If the set depth limit is the height of the tree, the worst case storage will be O(h).
          </p>

          <h4>Example 1 (Node found before depth limit is reached):</h4>
          <AnimationManager input={{type: "bst", values: exampleArr, target: 23}} algorithm={Algorithm.DepthLimitedSearch} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>

          <h4 className="v-space">Example 2 (Node not found before depth limit is reached):</h4>

          <AnimationManager input={{type: "bst", values: exampleArr, target: 22}} algorithm={Algorithm.DepthLimitedSearch} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table</h4>
          <ComplexityTable 
            algoType={Algo.Search}
            dataType={DataStructure.Tree}
            name={header} 
            best={"O(1)"} 
            average={"O(n)"} 
            worst={"O(n)"} 
            memory={"O(L)"} 
          />

          <h4 className="v-space">References</h4>
          <a href="https://www.geeksforgeeks.org/artificial-intelligence/depth-limited-search-for-ai/" target="_blank">Geeksforgeeks</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/dfsTreeSearch.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
        </>
      )}
      
    </div>
  )
}

export default DepthLimitedSearchPage