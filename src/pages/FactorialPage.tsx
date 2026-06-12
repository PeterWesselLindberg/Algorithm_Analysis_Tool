import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"

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
        <AnimationManager input={{type: "array", data: [15]}} algorithm="factorial" visualizationGraphics={Visualization.List} />
      )}
    
      {selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default FactorialPage