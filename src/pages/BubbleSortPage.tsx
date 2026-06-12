import AnimationManager from "../components/AnimationManager"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import ComplexityTable from "../components/ComplexityTable"
import Algo from "../types/algoType"
import DataStructure from "../types/dataType"
import Stable from "../types/stableType"

const BubbleSortPage = () => {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const header: string = "Bubble sort"
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
        <AnimationManager input={generateRandomArray(15)}
          algorithm={Algorithm.BubbleSort} visualizationGraphics={Visualization.ListBar} />
      )}

      {selectedTab === 0 && (
        <>
          <p>
            Bubble sort is a sorting algorithm, that builds the final sorted array/list by repeatedly stepping through the list,
            comparing each pair of adjacent items to each other and swapping them if they are in the wrong order. 
            The stepping through the list repeated until no swaps are needed. It is not as efficient on large lists as more advanced sorting algorithms 
            such as quicksort, heapsort or mergesort.
          </p>

          <h2>Complexity</h2>
          <h4>Best case performance</h4>
          <p>
            The best case scenario for bubble sort is the case where the list is already sorted
              from lowest to highest and has a running time of O(n) comparisons and O(1) swap:
          </p>

          <AnimationManager input={{type: "array", data: bestCaseArr}} algorithm={Algorithm.BubbleSort} visualizationGraphics={Visualization.ListBar} isInAbout={true}/>
          
          <h4 className="v-space">Worst case performance</h4>
          <p>
            The worst case scenario for bubble sort is the case where the list goes
             from highest to lowest and has a running time of O(n<sup>2</sup>) comparisons and O(n<sup>2</sup>) swaps:
          </p>

          <AnimationManager input={{type: "array", data: worstCaseArr}} algorithm={Algorithm.BubbleSort} visualizationGraphics={Visualization.ListBar} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table</h4>
          <ComplexityTable 
            algoType={Algo.Sorting}
            dataType={DataStructure.Arr}
            name={header} 
            best={"O(n) comparisons and O(1) swaps"} 
            average={"O(n^{2}) comparisons and O(n^{2}) swaps"} 
            worst={"O(n^{2}) comparisons and O(n^{2}) swaps"} 
            memory={"O(1)"} 
            stable={Stable.Yes}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Bubble_sort" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bubbleSort.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
        </>
      )}
      
    </div>
  )
}

export default BubbleSortPage