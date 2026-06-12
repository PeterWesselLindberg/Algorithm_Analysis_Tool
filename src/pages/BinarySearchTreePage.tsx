import AnimationManager from "../components/AnimationManager"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import {oneItem, addToList} from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"

const BinarySearchTreePage = () => {
  
  const visualItems: string[] = addToList(oneItem, ["Insertion", "BFS search", "DFS search", "Deletion"])

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  const {values , target} = generateRandomBalancedValues(10, false, true)

    return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      
      { selectedTab === 1 && (
        <>
          <h1>Binary search tree Insertion</h1>
          <AnimationManager input={generateRandomArray(7)} algorithm={Algorithm.BSTinsert} visualizationGraphics={Visualization.ExListTree} />
        </>
      )}

      { selectedTab === 2 && (
        <>
          <h1>Binary search tree breadth-first search</h1>
          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.BFSTreeSearch} visualizationGraphics={Visualization.TVListTree} />
        </>
      )}

      { selectedTab === 3 && (
        <>
        <h1>Binary search tree depth-first search</h1>
        <AnimationManager input={{type: "bst", values, target}}
          algorithm={Algorithm.DFSTreeSearch} visualizationGraphics={Visualization.TVListTree} />
       </>
      )}
      { selectedTab === 4 && (
        <>
          <h1>Binary search tree deletion</h1>

          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.BSTDelete} visualizationGraphics={Visualization.TVListTree} />
        </>
      )}

      { selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default BinarySearchTreePage