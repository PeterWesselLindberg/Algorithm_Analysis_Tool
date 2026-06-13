import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"

const FactorialPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>Nth factorial</h1>
      { selectedTab === 1 && (
        <AnimationManager input={{type: "array", data: [15]}} algorithm={Algorithm.Factorial} visualizationGraphics={Visualization.List}
        structure={StructureColor.ArrColor} />
      )}
    
      {selectedTab === 0 && (
        <>
          <p>
            The factorail of a non-negative integer n, denoted n! is the product of all positive integers less than or eqyal to n.<br/>
            For example:<br/> 
            5! = 5 × 4 × 3 × 2 × 1 = 120
          </p>
        
        
          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Factorial" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/factorial.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
        </>
      )}
    </div>
  )
}

export default FactorialPage