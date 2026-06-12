import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems from "../utils/visualItems"
import ComplexityTable from "../components/ComplexityTable"
import  Visualization  from "../types/VisualizationType"
import Algo from "../types/algoType"
import DataStructure from "../types/dataType"
import Stable from "../types/stableType"
import { Algorithm } from "../types/algorithmtypes"

const InsertionSortPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const header: string = "Insertion Sort"
  const bestCaseArr: number[] = [1,3,5,6,8,10,12,15]
  const worstCaseArr: number[] = bestCaseArr.slice().reverse()

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      <h1>{header}</h1>
      
      {selectedTab === 1 && (
        <>
          <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.InsertionSort} visualizationGraphics={Visualization.ListBar} />
        </>
      )}

      {selectedTab === 0 && (
        <>
          <p>
            Insertion sort is a sorting algorithm, that builds the final sorted array/list one item at a time. 
            It is not as efficient on large lists as more advanced sorting algorithms such as quicksort, heapsort or mergesort.
          </p>

          <h2>Complexity</h2>
          <h4>Best case performance</h4>
          <p>
            The best case scenario for insertion sort is the case where the list is already sorted from lowest to highest and has a running time of O(n):
          </p>

          <AnimationManager input={{type: "array", data: bestCaseArr}} algorithm={Algorithm.InsertionSort} visualizationGraphics={Visualization.ListBar} isInAbout={true}/>
          
          <h4 className="v-space">Worst case performance</h4>
          <p>
            The worst case scenario for insertion sort is the case where the list goes from highest to lowest and has a running time of O(n<sup>2</sup>):
          </p>

          <AnimationManager input={{type: "array", data: worstCaseArr}} algorithm={Algorithm.InsertionSort} visualizationGraphics={Visualization.ListBar} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table</h4>
          <ComplexityTable algoType={Algo.Sorting} dataType={DataStructure.Arr} name={header} best={"O(n)"} average={"O(n^{2})"} worst={"O(n^{2})"} memory={"O(1)"} stable={Stable.Yes}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Insertion_sort" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/insertionSort.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
        </>
      )}
      
    </div>
  )
}

export default InsertionSortPage