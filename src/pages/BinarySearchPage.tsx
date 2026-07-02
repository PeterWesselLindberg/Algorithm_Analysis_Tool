import AnimationManager from "../components/AnimationManager"
import { generateRandomArrayWithTarget } from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"
import Algo from "../types/algoType"

const BinarySearchPage = () => {
  
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const header: string = "Binary Search"
    const exampleArr: number[] = [1,3,5,6,8,10,12,15,17]

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }

    return (
        <div>
            <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>{header}</h1>
          
            { selectedTab === 1 && (
                <AnimationManager input={generateRandomArrayWithTarget(15)} algorithm={Algorithm.BinarySearch} visualizationGraphics={Visualization.TListBar}
                structure={StructureColor.ArrColor}/>
            )}

            { selectedTab === 0 && (
                <>
                    <p>
                        Binary search is a search algorithm, that finds the position of a target value within a sorted array by comparing the target value to the middle element of the array.<br/>
                        If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value.<br/>
                        It does this continously until it has found the position of the target.
                    </p>

                    <h2>Complexity</h2>
                    <h4>Best case performance</h4>
                    <p>
                        The best case scenario for binary search is the case where the target value is located in the middle of the sorted array and has a running time of O(1):
                    </p>

                    <AnimationManager input={{type: "search", data: exampleArr, target: 8}} algorithm={Algorithm.BinarySearch} visualizationGraphics={Visualization.TListBar} isInAbout={true}/>
                    
                    <h4 className="v-space">Worst case performance</h4>
                    <p>
                        The worst case scenario for binary search is the case where the target value is located at the end of the sorted array,<br/>
                        since the most amount of comparisons then have to be done and has a running time O(log(n)):
                    </p>

                    <AnimationManager input={{type: "search", data: exampleArr, target: 17}} algorithm={Algorithm.BinarySearch} visualizationGraphics={Visualization.TListBar} isInAbout={true}/>
                  
                    <h4 className="v-space">Complexity table</h4>
                    <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Arr} name={header} best={"O(1)"} average={"O(log(n))"} worst={"O(log(n))"} memory={"O(1)"}/>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Binary_search" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                      href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/binarySearch.ts" target="_blank">
                      PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>
                </>
          )}
          
        </div>
    )
}

export default BinarySearchPage