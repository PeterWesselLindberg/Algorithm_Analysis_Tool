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

const RandQuickSortPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)
  const header: string = "Randomized Quick Sort"
  const exampleArr: number[] = [1,5,3,12,8,10,15,6]

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/> 
      <h1>{header}</h1>
      
      {selectedTab === 1 && (
        <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.RQuickSort} visualizationGraphics={Visualization.ListBar}
        structure={StructureColor.ArrColor} />
      )}

      {selectedTab === 0 && (
        <>
          <p>
            Randomized quick sort is a sorting algorithm based on the divide and conquer approach, that builds the final sorted array/list by picking a pivot element at random and<br/> 
            partioning the elements next to that pivot element into two sub-arrays, according to whether they are less than or greater than the pivot element.<br/>
            The algorithm then sorts the sub-arrays recursiverly. It is rather efficient on large randomized lists.
          </p>

          <h2>Complexity</h2>
          <h4>Best case performance</h4>
          <p>
            The best case scenario for random quick sort is any list, since the random selection of a pivot element is the primary determiner for if a worst or best case occurs.<br/>
            As for the running time of the best case it is O(n log(n)).
          </p>

          <h4>Worst case performance</h4>
          <p>
            The worst case scenario for random quick sort rarely happens, do to the random selection of the pivot element, but if it does happen it has a running time of O(n<sup>2</sup>):
          </p>

          <AnimationManager input={{type: "array", data: exampleArr}} algorithm={Algorithm.RQuickSort} visualizationGraphics={Visualization.ListBar} isInAbout={true}/>
          
          

          
          <h4 className="v-space">Complexity table</h4>
          <ComplexityTable algoType={Algo.Sorting} dataType={DataStructure.Arr} name={header} best={"O(n log(n))"} average={"O(n log(n))"} worst={"O(n^{2})"} memory={"O(n)"} stable={Stable.No}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Quicksort" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/randQuickSort.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
        </>
      )}
      
    </div>
  )
}

export default RandQuickSortPage