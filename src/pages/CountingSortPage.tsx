import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"
import Algo from "../types/algoType"
import Stable from "../types/stableType"

const CountingSortPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = Number(searchParams.get("tab") ?? 1)
  const header: string = "Counting Sort"
  const exampleArr: number[] = [1,5,3,12,8,10,15,6]

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>{header}</h1>
      { selectedTab === 1 && (
        <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.CountingSort} visualizationGraphics={Visualization.List3}
        structure={StructureColor.ArrColor} />
      )}
    
      {selectedTab === 0 && (
        <>
          <p>
            Counting sort is a sorting algorithm based on the non-comparison-based approach, that builds the final sorted array/list by counting the number of elements,<br/>
            that have each distinct key value and using arithmetic on those counts to the determine the position of each key value in the output array.
          </p>

          <h2>Time Complexity</h2>
          <p>
           The time complexity for counting sort is O(N + K) in all cases, where N and K are the size of inputArray and the countArray used for the sorting.
          </p>

          <AnimationManager input={{type: "array", data: exampleArr}} algorithm={Algorithm.CountingSort} visualizationGraphics={Visualization.List3} isInAbout={true}/>
          
          <h2 className="v-space">Space complexity</h2>
          <p>The space complexity for counting sort is O(N + K).</p>

          
          <h4 className="v-space">Complexity table</h4>
          <ComplexityTable algoType={Algo.Sorting} dataType={DataStructure.Arr} name={header} best={"O(N + K)"} average={"O(N + K)"} worst={"O(N + K)"} memory={"O(N + K)"} stable={Stable.Yes}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Counting_sort" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/countingSort.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
        </>
      )}
    </div>
  )
}

export default CountingSortPage