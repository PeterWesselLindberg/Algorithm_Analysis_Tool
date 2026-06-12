import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import generateRandomGraph from "../randGen/generateRandomGraph"
import { addToList, oneItem } from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"

const BFSTraversalPage = () => {
    
    const items: string[] = addToList(oneItem, ["BFS tree traversal", "BFS graph traversal"])

    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }
    
    return (
        <div>
            <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            
            { selectedTab === 1 &&  (
                <>
                    <h1>{items[1]}</h1>
                    <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.BFSTreeTraversal} visualizationGraphics={Visualization.ListTree} />
                </>
            )} 

            { selectedTab === 2 &&  (
                <>
                    <h1>{items[2]}</h1>
                    <AnimationManager input={generateRandomGraph(5, true)} algorithm={Algorithm.BFSGraph} visualizationGraphics={Visualization.ListGraph} />
                </>
            )} 

            { selectedTab === 0 && (
                <p> This text was hidden all along</p>
            )}
        </div>
    )
}

export default BFSTraversalPage