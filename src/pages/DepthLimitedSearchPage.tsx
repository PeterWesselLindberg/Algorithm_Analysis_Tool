import AnimationManager from "../components/AnimationManager"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"

const DepthLimitedSearchPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  const {values , target} = generateRandomBalancedValues(31, false, true)

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>Depth limited search</h1>
      
      {selectedTab === 1 && (
        <AnimationManager input={{type: "bst", values, target}}
          algorithm={Algorithm.DepthLimitedSearch} visualizationGraphics={Visualization.TVListTree} />
      )}

      {selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default DepthLimitedSearchPage