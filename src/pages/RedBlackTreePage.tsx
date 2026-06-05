import AnimationManager from "../components/AnimationManager"
// import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import { oneItem,addToList } from "../utils/visualItems"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"

const RedBlackTreePage = () => {

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
          <h1>Red-Black tree Insertion</h1>
          <AnimationManager input={{type: "bst", values, target}} algorithm="redBlackInsert" visualizationGraphics="TVList/tree" />
        </>
      )}

      { selectedTab === 2 && (
        <>
          <h1>Red-Black tree breadth-first search</h1>
          <AnimationManager input={{type: "bst", values, target}}
            algorithm="bfsRedBlackSearch" visualizationGraphics="TVList/tree" />
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

          {/* <AnimationManager input={{type: "bst", values, target}}
            algorithm="bstDeletion" visualizationGraphics="TVList/tree" /> */}
        </>
      )}

      { selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default RedBlackTreePage