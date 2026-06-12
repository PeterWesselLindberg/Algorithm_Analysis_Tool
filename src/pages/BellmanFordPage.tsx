import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import generateRandomGraph from "../randGen/generateRandomGraph"
import { addToList, oneItem } from "../utils/visualItems"
import { useSearchParams } from "react-router-dom"
import Visualization from "../types/VisualizationType"

const BellmanFordPage = () => {
    
    const additionalItems : string[] = [
        "Shortest path between two nodes",
        "Shortest path for full graph",
        "Shortest path between two nodes with negative weights",
        "Shortest path for full graph with negative weights"
    ]

    const items: string[] = addToList(oneItem, additionalItems)

    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }

    
    return (
        <div>
            <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>Bellman-Ford's shortest path</h1>
        
            { selectedTab === 1 &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true, true)}
                        algorithm="bellmanFordRandom" visualizationGraphics={Visualization.DistListGraph}/>
                </>
            )}

            { selectedTab === 2 &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true, true, false, true)} 
                        algorithm="bellmanFordFull" visualizationGraphics={Visualization.DistListGraph} />
                </>
            )}

            { selectedTab === 3 &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true, true, true)} 
                        algorithm="bellmanFordRandom" visualizationGraphics={Visualization.DistListGraph} />
                </>
            )}

            { selectedTab === 4 &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true, true, true)} 
                        algorithm="bellmanFordFull" visualizationGraphics={Visualization.DistListGraph} />
                </>
            )}

            { selectedTab === 0 && (
                <p> This text was hidden all along</p>
            )}
        </div>
    )
}

export default BellmanFordPage