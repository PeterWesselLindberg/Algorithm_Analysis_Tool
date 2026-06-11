import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"
import ComplexityTable from "../components/ComplexityTable"

const InsertionSortPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>Insertion sort</h1>
      
      {selectedTab === 1 && (
        <AnimationManager input={generateRandomArray(15)} algorithm="insertion" visualizationGraphics="list/bar" />
      )}

      {selectedTab === 0 && (
        <>
          <p> This text was hidden all along</p>
          <ComplexityTable name= "1" best={"2"} average={"3"} worst={"4"} memory={"5"} stable={"6"}/>
        </>
      )}
      
    </div>
  )
}

export default InsertionSortPage