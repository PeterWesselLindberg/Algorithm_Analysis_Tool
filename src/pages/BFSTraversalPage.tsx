import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"
import generateRandomGraph from "../randGen/generateRandomGraph"

const BFSTraversalPage = () => {
    const items = ["Readme.md", "BFS tree traversal", "BFS graph traversal"]
    const [selectedTab, setSelectedTab] = useState(items[1])
    
    return (
        <div>
        <TopNavBar items={items} onSelectItem={setSelectedTab}/>
        
        { selectedTab === items[1] &&  (
            <>
                <h1>{items[1]}</h1>
                <AnimationManager input={generateRandomArray(15)} algorithm="bfsTreeTraversal" visualizationGraphics="list/tree" />
            </>
        )} 

        { selectedTab === items[2] &&  (
            <>
                <h1>{items[2]}</h1>
                <AnimationManager input={generateRandomGraph(5, true)} algorithm="bfsGraphTraversal" visualizationGraphics="list/graph" />
            </>
        )} 

        {selectedTab === items[0] && (
            <p> This text was hidden all along</p>
        )}
        </div>
    )
}

export default BFSTraversalPage