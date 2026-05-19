import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"

const DFSTraversalPage = () => {
    const items = ["Readme.md", "DFS tree traversal"]
    const [selectedTab, setSelectedTab] = useState(items[1])
    
    return (
        <div>
        <TopNavBar items={items} onSelectItem={setSelectedTab}/>
        
        { selectedTab === items[1] &&  (
            <>
                <h1>{items[1]}</h1>
                <AnimationManager unsortedNumbers={generateRandomArray(15)} algorithm="preorderTraversal" visualizationGraphics="list/tree" />
            </>
        )} 

        {selectedTab === items[0] && (
            <p> This text was hidden all along</p>
        )}
        </div>
    )
}

export default DFSTraversalPage