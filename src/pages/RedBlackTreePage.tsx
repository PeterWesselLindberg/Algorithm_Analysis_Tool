import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import { oneItem,addToList } from "../utils/visualItems"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import Visualization from "../types/VisualizationType"

const RedBlackTreePage = () => {

  const visualItems: string[] = addToList(oneItem, ["Insertion", "BFS search", "DFS search", "Deletion"])

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
          <AnimationManager input={{type: "bst", values, target}} algorithm="redBlackInsert" visualizationGraphics={Visualization.TVListTree} />
        </>
      )}

      { selectedTab === 2 && (
        <>
          <h1>Red-Black tree breadth-first search</h1>
          <AnimationManager input={{type: "bst", values, target}}
            algorithm="bfsRedBlackSearch" visualizationGraphics={Visualization.TVListTree} />
        </>
      )}

      { selectedTab === 3 && (
        <>
        <h1>Red-Black tree depth-first search</h1>
        <AnimationManager input={{type: "bst", values, target}}
          algorithm="dfsRedBlackSearch" visualizationGraphics="TVList/tree" />
       </>
      )}
      { selectedTab === 4 && (
        <>
          <h1>Red-Black tree deletion</h1>

          <AnimationManager input={{type: "bst", values, target}}
            algorithm="redBlackDelete" visualizationGraphics="TVList/tree" />
        </>
      )}

      { selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default RedBlackTreePage