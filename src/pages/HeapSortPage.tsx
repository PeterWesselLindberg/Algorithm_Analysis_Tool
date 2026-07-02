import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import visualItems, { addToList } from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"
import Algo from "../types/algoType"


const HeapSortPage = () => {

    const items = addToList(visualItems, ["Visualizer without heap"])
    
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const header: string = "Heap Sort"
    const bestCaseArr: number[] = [1,3,5,6,8,10,12,15].reverse()
    const worstCaseArr: number[] = [3,1,5,6,12,10,15,8]

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }
  

    return (
        <div>
            <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>Heap sort</h1>
            { selectedTab === 1 &&  (
                <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.HeapSort} visualizationGraphics={Visualization.ListHeap}
                structure={StructureColor.ArrColor} />
            )} 
      
            { selectedTab === 2 &&  (
                <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.HeapSort} visualizationGraphics={Visualization.ListBar}
                structure={StructureColor.ArrColor}/>
            )}

            {selectedTab === 0 && (
                <>
                    <p>
                        Heap sort is a sorting algorithm, that builds the final sorted array/list one item at a time.<br/>
                        It is not as efficient on large lists as more advanced sorting algorithms such as quicksort, heapsort or mergesort.
                    </p>

                    <h2>Complexity</h2>
                    <h4>Best case performance</h4>
                    <p>
                        The best case, average case and worst case scenario for heap sort all have the same time complexity, since heap sort is an efficient algorithm. <br/>
                        You can however reduce the required work by using an array, which when building the heap already is a max heap thereby skipping the heap maximization of the building:
                    </p>

                    <AnimationManager input={{type: "array", data: bestCaseArr}} algorithm={Algorithm.HeapSort} visualizationGraphics={Visualization.ListHeap} isInAbout={true}/>
                
                    <h4 className="v-space">Worst case performance</h4>
                    <p>
                        The best case, average case and worst case scenario for heap sort all have the same time complexity, since heap sort is an efficient, comparison-based sorting algorithm:
                    </p>

                    <AnimationManager input={{type: "array", data: worstCaseArr}} algorithm={Algorithm.HeapSort} visualizationGraphics={Visualization.ListHeap} isInAbout={true}/>
                
                    <h4 className="v-space">Complexity table</h4>
                    <ComplexityTable algoType={Algo.Sorting} dataType={DataStructure.Arr} name={header} best={"O(n log(n))"} average={"O(n log(n))"} worst={"O(n log(n))"} memory={"O(n log(n))"}/>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Heapsort" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/heapSort.ts" target="_blank">
                        PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>
                </>
            )}
        </div>
    )
}

export default HeapSortPage