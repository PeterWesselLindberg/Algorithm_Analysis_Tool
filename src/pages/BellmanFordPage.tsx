import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomGraph from "../randGen/generateRandomGraph"

const BellmanFordPage = () => {
    const items = [
        "Readme.md",
        "Bellman-Ford's shortest path between two nodes",
        "Bellman-Ford's shortest path for full graph",
        "Bellman-Ford's shortest path between two nodes with negative weights",
        "Bellman-Ford's shortest path for full graph with negative weights"
    ]
    const [selectedTab, setSelectedTab] = useState(items[1])
    
    return (
        <div>
        <TopNavBar items={items} onSelectItem={setSelectedTab}/>
        <h1>Bellman-Ford's shortest path</h1>
        
        { selectedTab === items[1] &&  (
            <>
                
                <AnimationManager input={generateRandomGraph(5, true, true, true)} algorithm="bellmanFordRandom" visualizationGraphics="distList/graph" />
            </>
        )}

        { selectedTab === items[2] &&  (
            <>
                
                <AnimationManager input={generateRandomGraph(5, true, true, true)} algorithm="bellmanFordFull" visualizationGraphics="distList/graph" />
            </>
        )}

        { selectedTab === items[3] &&  (
            <>
                
                <AnimationManager input={generateRandomGraph(5, true, true, true, true)} algorithm="bellmanFordRandom" visualizationGraphics="distList/graph" />
            </>
        )}

        { selectedTab === items[4] &&  (
            <>
                
                <AnimationManager input={generateRandomGraph(5, true, true, true, true)} algorithm="bellmanFordFull" visualizationGraphics="distList/graph" />
            </>
        )}

        {selectedTab === items[0] && (
            <p> This text was hidden all along</p>
        )}
        </div>
    )
}

export default BellmanFordPage