import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import visualItems from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"

const FibonacciPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }

    return (
        <div>
            <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>The fibonacci sequence</h1>

            { selectedTab === 1 && (
                <AnimationManager input={{type: "array", data: [16]}} algorithm={Algorithm.Fibonacci} visualizationGraphics={Visualization.List}
                structure={StructureColor.ArrColor} />
            )}
          
            {selectedTab === 0 && (
                <>
                    <p>
                        The fibonacci sequence is a sequence in which each element is the sum of the two elements, that precede it.<br/>
                        The numbers that are part of the sequence is often referenced as Fibonacci numers and is commonly denoted F<sub>n</sub>.<br/> 
                        The initial elements of the sequence are F<sub>0</sub> = 1, F<sub>1</sub> = 1 and F<sub>2</sub> = 1. Starting from F0, the sequence is:<br/>
                        0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
                    </p>
              
              
                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Fibonacci_sequence" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/fibonacci.ts" target="_blank">
                        PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>
                </>
            )}
        </div>
    )
}

export default FibonacciPage