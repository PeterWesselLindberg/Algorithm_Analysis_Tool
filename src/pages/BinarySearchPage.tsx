import AnimationManager from "../components/AnimationManager"
import { generateRandomArrayWithTarget } from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"

const BinarySearchPage = () => {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = Number(searchParams.get("tab") ?? 1)

    const handleSelectTab = (_item: string, index: number) => {
      setSearchParams({ tab: index.toString() })
    }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>Binary search</h1>
      
      { selectedTab === 1 && (
        <AnimationManager input={generateRandomArrayWithTarget(15)} algorithm={Algorithm.BinarySearch} visualizationGraphics={Visualization.TListBar} />
      )}

      { selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default BinarySearchPage