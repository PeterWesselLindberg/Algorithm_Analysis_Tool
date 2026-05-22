import visualItems from "../utils/visualItems"
import { useState } from "react"
import TopNavBar from "../components/TopNavBar"
import AnimationManager from "../components/AnimationManager"
import generateRandomGraph from "../randGen/generateRandomGraph"

const KruskalsPage = () => {
    const [selectedTab, setSelectedTab] = useState(visualItems[1])
    
    
    return (
        <div>
            <TopNavBar items={visualItems} onSelectItem={setSelectedTab}/>
            <h1>Kruskal's minimum spanning tree</h1>
            { selectedTab === visualItems[1] && (
            <AnimationManager input={generateRandomGraph(5, true, true)} algorithm="kruskals" visualizationGraphics="mstList/graph" />
            )}
            
            {selectedTab === visualItems[0] && (
                <p> This text was hidden all along</p>
            )}
        </div>
    )
}

export default KruskalsPage