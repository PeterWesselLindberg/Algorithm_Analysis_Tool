import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomGraph from "../randGen/generateRandomGraph"
import visualItems from "../utils/visualItems"

const DijkstrasPage = () => {
    const items = [
        "Readme.md",
        "Dijkstra's shortest path between two nodes",
        "Dijkstra's shortest path for full graph",
    ]
    const [selectedTab, setSelectedTab] = useState(items[1])
    
    return (
        <div>
        <TopNavBar items={items} onSelectItem={setSelectedTab}/>
        <h1>Dijkstra's shortest path</h1>
        
        { selectedTab === items[1] &&  (
            <>
                
                <AnimationManager input={generateRandomGraph(5, true, true)} algorithm="dijkstrasRandom" visualizationGraphics="distList/graph" />
            </>
        )}

        { selectedTab === items[2] &&  (
            <>
                
                <AnimationManager input={generateRandomGraph(5, true, true)} algorithm="dijkstrasFull" visualizationGraphics="distList/graph" />
            </>
        )}

        {selectedTab === visualItems[0] && (
            <p> This text was hidden all along</p>
        )}
        </div>
    )
}

export default DijkstrasPage