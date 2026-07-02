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


const MergeSortPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const selectedTab = Number(searchParams.get("tab") ?? 1)
    const header: string = "Merge Sort"
    const exampleArr: number[] = [1,5,3,12,8,10,15,6]

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }

    return (
        <div>
            <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>{header}</h1>
            
            {selectedTab === 1 && (
                <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.MergeSort} visualizationGraphics={Visualization.ListBar}
                structure={StructureColor.ArrColor} />
            )}

            {selectedTab === 0 && (
                <>
                    <p>
                        Merge sort is a sorting algorithm based on the divide and conquer approach, that builds the final sorted array/list by recursively splitting an array into two sub-arrays and<br/> 
                        then recursively sort the 2 sub-arrays and finally merging all the arrays back together into a single sorted array.<br/>
                    </p>

                    <h2>Complexity</h2>
                    <h4>Best case performance</h4>
                    <p>
                        The best case scenario for merge sort is any list, since the recursive splitting of the arrays into 2 sub-arrays, that then get sorted recursively<br/>   
                        always ensures a best case running time of Ω(n log(n)).
                    </p>

                    <h4>Worst case performance</h4>
                    <p>
                        The worst case scenario for merge sort is very similar to the best case performance due the recursive splitting and sorting of sub-arrays and has a running time of O(n log(n)):
                    </p>

                    <AnimationManager input={{type: "array", data: exampleArr}} algorithm={Algorithm.MergeSort} visualizationGraphics={Visualization.ListBar} isInAbout={true}/>
                                      
                    <h4 className="v-space">Complexity table</h4>
                    <ComplexityTable algoType={Algo.Sorting} dataType={DataStructure.Arr} name={header} best={"Ω(n log(n))"} average={"Θ(n log(n))"} worst={"O(n log(n))"} memory={"O(n)"} stable={Stable.Yes}/>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Merge_sort" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/mergeSort.ts" target="_blank">
                        PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>
                </>
            )}
          
        </div>
    )
}

export default MergeSortPage