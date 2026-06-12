import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"
import ComplexityTable from "../components/ComplexityTable"
import  Visualization  from "../types/VisualizationType"
import Algo from "../types/algoType"
import DataStructure from "../types/dataType"

const InsertionSortPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const header: string = "Insertion Sort"

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>{header}</h1>
      
      {selectedTab === 1 && (
        <AnimationManager input={generateRandomArray(15)} algorithm="insertion" visualizationGraphics={Visualization.ListBar} />
      )}

      {selectedTab === 0 && (
        <>
          <p> This text was hidden all along</p>
          <ComplexityTable algoType={Algo.Sorting} dataType={DataStructure.Arr} name={header} best={"2"} average={"3"} worst={"4"} memory={"5"} stable={"6"}/>
        </>
      )}
      
    </div>
  )
}

export default InsertionSortPage