import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useState } from "react"
import generateRandomArray from "../randGen/generateRandomArray"

const DFSTraversalPage = () => {
    const items = ["Readme.md", "DFS tree traversal", "DFS graph traversal"]
    const [selectedTab, setSelectedTab] = useState(items[1])
    const sampleGraph = {
            nodes: [

                {
                id: "A",
                value: 1,

                x: 200,
                y: 100,

                neighbors: ["B", "C"]
                },

                {
                id: "B",
                value: 2,

                x: 100,
                y: 220,

                neighbors: ["D"]
                },

                {
                id: "C",
                value: 3,

                x: 300,
                y: 220,

                neighbors: []
                },

                {
                id: "D",
                value: 4,

                x: 340,
                y: 100,

                neighbors: []
                }
            ]
    }
    
    return (
        <div>
        <TopNavBar items={items} onSelectItem={setSelectedTab}/>
        
        { selectedTab === items[1] &&  (
            <>
                <h1>{items[1]}</h1>
                <AnimationManager input={generateRandomArray(15)} algorithm="preorderTraversal" visualizationGraphics="list/tree" />
            </>
        )}

         { selectedTab === items[2] &&  (
            <>
                <h1>{items[2]}</h1>
                <AnimationManager input={sampleGraph} algorithm="dfsGraphTraversal" visualizationGraphics="list/graph" />
            </>
        )}  

        {selectedTab === items[0] && (
            <p> This text was hidden all along</p>
        )}
        </div>
    )
}

export default DFSTraversalPage