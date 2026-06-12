import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems, { addToList } from "../utils/visualItems"
import Visualization from "../types/VisualizationType"



const HeapSortPage = () => {

  const items = addToList(visualItems, ["Visualizer without heap"])
  
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }
  

  return (
    <div>
      <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>Heap sort</h1>
      { selectedTab === 1 &&  (
        <AnimationManager input={generateRandomArray(15)} algorithm="heap" visualizationGraphics={Visualization.ListBarTree} />
      )} 
      
      { selectedTab === 2 &&  (
        <AnimationManager input={generateRandomArray(15)} algorithm="heap" visualizationGraphics={Visualization.ListBar} />
      )}

      {selectedTab === 0 && (
        <p> This text was hidden all along</p>
      )}
    </div>
  )
}

export default HeapSortPage