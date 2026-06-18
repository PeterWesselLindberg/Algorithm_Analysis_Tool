import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomArray from "../randGen/generateRandomArray"
import generateRandomGraph from "../randGen/generateRandomGraph"
import { addToList, oneItem } from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm, type AlgorithmInput } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"
import Algo from "../types/algoType"
import type { GraphData } from "../dataStructures/GraphData"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"

const BFSTraversalPage = () => {
    
    const items: string[] = addToList(oneItem, ["BFS tree traversal", "BFS graph traversal"])
    const header: string = "Breadth first search (BFS)"

    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)
    
    const nodes: GraphNodeData[] = [
        {id: "0", value: 0, x: 400, y: 70, neighbors: [{to: "1"}]},
        {id: "1", value: 1, x: 571, y: 194, neighbors: [{to: "2"}, {to: "3"}]},
        {id: "2", value: 2, x: 505, y: 395, neighbors: [{to: "3"}]},
        {id: "3", value: 3, x: 294, y: 395, neighbors: [{to: "4"}]},
        {id: "4", value: 4, x: 228, y: 194, neighbors: []}
    ]
    const exampleGraph: GraphData = {nodes, directed: false}

    const exampleTree: AlgorithmInput = { type: "array", data: [1,2,3,4,5,6,7]} 
    
    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }
    
    return (
        <div>
            <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            
            { selectedTab === 1 &&  (
                <>
                    <h1>{items[1]}</h1>
                    <AnimationManager input={generateRandomArray(15)} algorithm={Algorithm.BFSTreeTraversal} visualizationGraphics={Visualization.ListTree}
                    structure={StructureColor.TraversalColor} />
                </>
            )} 

            { selectedTab === 2 &&  (
                <>
                    <h1>{items[2]}</h1>
                    <AnimationManager input={generateRandomGraph(5, true)} algorithm={Algorithm.BFSGraph} visualizationGraphics={Visualization.ListGraph}
                    structure={StructureColor.TraversalColor} />
                </>
            )} 

            { selectedTab === 0 && (
                <>
                    <h1>{header}</h1>
                    <p>Breadth-first search (BFS) is an algorithm used for traversing or searching tree and graph data structures.</p>
                    
                    <h3>Trees</h3>
                    <p>In tree datastructures it starts at the root and explores the tree depth layers one at a time.</p>
                    <AnimationManager input={exampleTree} algorithm={Algorithm.BFSTreeTraversal} visualizationGraphics={Visualization.ListTree}
                        isInAbout={true} />
                        
                    <h3 className="v-space">Graphs</h3>
                    <p>In Graph datastructures it starts at an arbitrary node and explores the neighbour nodes first, before moving on to the next level neighbours.</p>
                    <AnimationManager input={{ type: "graph", data:exampleGraph }} algorithm={Algorithm.BFSGraph} visualizationGraphics={Visualization.ListGraph}
                        isInAbout={true} />
                    
                    <h2 className="v-space">Time complexity</h2>
                    <p>The time complexity for a BFS is O(|V|+|E|), where V is the total amount of vertices(nodes) present in the graph and E is the amount of edges present in the graph.</p>
                    
                    <h2>Space complexity</h2>
                    <p>The space complexity for a BFS is O(|V|).</p>
                    
                    <h4 className="v-space">Complexity table</h4>
                    <ComplexityTable algoType={Algo.SearchTraversal} dataType={DataStructure.Graph} name={header} worst={"O(|V| + |E|)"} memory={"O(|V|)"}/>

                    <h2>Applications</h2>
                    <p>BFS is used in:</p>
                    <ul>
                        <li>Finding the shortest path between two nodes in a graph</li>
                        <li>Detecting cycles in a graph</li>
                        <li>Network routing</li>
                        <li>Ford-Fulkerson method for computing the maximum flow in a flow network</li>
                    </ul>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Breadth-first_search" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bfsGraphTraversal.ts" target="_blank">
                        BFS Graph traversal</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bfsTreeTraversal.ts" target="_blank">
                        BFS Tree traversal</a>
                </>
                
            )}
        </div>
    )
}

export default BFSTraversalPage