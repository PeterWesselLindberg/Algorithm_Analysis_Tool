import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomGraph from "../randGen/generateRandomGraph"
import { addToList, oneItem } from "../utils/visualItems"

const BellmanFordPage = () => {
    const additionalItems : string[] = [
        "Shortest path between two nodes",
        "Shortest path for full graph",
        "Shortest path between two nodes with negative weights",
        "Shortest path for full graph with negative weights"
    ]
    const items: string[] = addToList(oneItem, additionalItems)
    const [selectedTab, setSelectedTab] = useState(items[1])
    
    return (
        <div>
            <TopNavBar items={items} onSelectItem={setSelectedTab}/>
            <h1>Bellman-Ford's shortest path</h1>
        
            { selectedTab === items[1] &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true, true)}
                        algorithm="bellmanFordRandom" visualizationGraphics="distList/graph" />
                </>
            )}

            { selectedTab === items[2] &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true, true, false, true)} 
                        algorithm="bellmanFordFull" visualizationGraphics="distList/graph" />
                </>
            )}

            { selectedTab === items[3] &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true, true, true)} 
                        algorithm="bellmanFordRandom" visualizationGraphics="distList/graph" />
                </>
            )}

            { selectedTab === items[4] &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true, true, true)} 
                        algorithm="bellmanFordFull" visualizationGraphics="distList/graph" />
                </>
            )}

            { selectedTab === items[0] && (
                <p> This text was hidden all along</p>
            )}
        </div>
    )
}

export default BellmanFordPage