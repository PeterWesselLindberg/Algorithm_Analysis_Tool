import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"

const BFSTraversalPage = () => {
    const items = ["Readme.md", "BFS tree traversal"]
    const [selectedTab, setSelectedTab] = useState(items[1])
    
    return (
        <div>
        <TopNavBar items={items} onSelectItem={setSelectedTab}/>
        
        { selectedTab === items[1] &&  (
            <>
                <h1>{items[1]}</h1>
                <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="bfsTreeTraversal" sortingGraphics="list/tree" />
            </>
        )} 

        {selectedTab === items[0] && (
            <p> This text was hidden all along</p>
        )}
        </div>
    )
}

export default BFSTraversalPage