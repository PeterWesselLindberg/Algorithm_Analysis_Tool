import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"

const RadixSortPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/> 
      <h1>Radix sort</h1>
      { selectedTab === 1 &&  (
        <AnimationManager input={generateRandomArray(15, 1, 999)} algorithm={Algorithm.RadixSort} visualizationGraphics={Visualization.List3} />
      )}

      { selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
      
    </div>
  )
}

export default RadixSortPage