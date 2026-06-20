import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import { oneItem,addToList } from "../utils/visualItems"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"

const RedBlackTreePage = () => {

  const visualItems: string[] = addToList(oneItem, ["Insertion", "BFS search", "DFS search", "BST search", "Deletion"])

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  const {values , target} = generateRandomBalancedValues(10, false, true)
    // const vals = [12,3,2,8,9,22,13,19,27,28]
    // const t = 8

    console.log(values)
    console.log(target)

    return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/> 
      
      { selectedTab === 1 && (
        <>
          <h1>Red-Black tree Insertion</h1>
          <AnimationManager input={{type: "bst", values, target}} algorithm={Algorithm.RBInsert} visualizationGraphics={Visualization.TVListTree}
          structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 2 && (
        <>
          <h1>Red-Black tree breadth-first search</h1>
          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.BFSRBSearch} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 3 && (
        <>
        <h1>Red-Black tree depth-first search</h1>
        <AnimationManager input={{type: "bst", values, target}}
          algorithm={Algorithm.DFSRBSearch} visualizationGraphics={Visualization.TVListTree}
          structure={StructureColor.BSTColor} />
       </>
      )}

      { selectedTab === 4 && (
        <>
          <h1>Red-Black tree binary search</h1>

          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.RBTreeSearch} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 5 && (
        <>
          <h1>Red-Black tree deletion</h1>

          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.RBDelete} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default RedBlackTreePage