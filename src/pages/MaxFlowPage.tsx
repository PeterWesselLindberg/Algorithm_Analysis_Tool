import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { addToList, oneItem } from "../utils/visualItems"
import { useSearchParams } from "react-router-dom"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
// import type { GraphNodeData } from "../dataStructures/GraphNodeData"
// import type { GraphData } from "../dataStructures/GraphData"
import generateRandomFlowNetwork from "../randGen/generateRandomFlowNetwork"
// import Algo from "../types/algoType"
// import ComplexityTable from "../components/ComplexityTable"
// import DataStructure from "../types/dataType"

const MaxFlowPage = () => {
    
    const additionalItems : string[] = [
        "The Ford-Fulkerson Method",
        "Edmonds-Karp's algorithm"
    ]

    const items: string[] = addToList(oneItem, additionalItems)

    // const header: string = "Max flow"

    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)

    // const nodes: GraphNodeData[] = [
    //             {id: "0", value: 0, x: 400, y: 70, neighbors: [{to: "1", weight:2}]},
    //             {id: "1", value: 1, x: 571, y: 194, neighbors: [{to: "2", weight:1}]},
    //             {id: "2", value: 2, x: 505, y: 395, neighbors: [{to: "3", weight:3}]},
    //             {id: "3", value: 3, x: 294, y: 395, neighbors: [{to: "4", weight:4}]},
    //             {id: "4", value: 4, x: 228, y: 194, neighbors: []}
    //         ]

    // const exampleGraph: GraphData = {nodes, directed: true}

    // const bestNodes: GraphNodeData[] = [
    //             {id: "0", value: 0, x: 400, y: 70, neighbors: [{to: "1", weight:2}, {to: "2", weight:1}, {to: "3", weight:3}, {to: "4", weight:4}]},
    //             {id: "1", value: 1, x: 571, y: 194, neighbors: []},
    //             {id: "2", value: 2, x: 505, y: 395, neighbors: []},
    //             {id: "3", value: 3, x: 294, y: 395, neighbors: []},
    //             {id: "4", value: 4, x: 228, y: 194, neighbors: []}
    //         ]

    // const bestExampleGraph: GraphData = {nodes: bestNodes, directed: true}

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }

    
    return (
        <div>
            <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
        
            { selectedTab === 1 &&  (
                <>
                    <h1>{additionalItems[0]}</h1>
                    <AnimationManager input={generateRandomFlowNetwork()}
                        algorithm={Algorithm.FordFulkerson} visualizationGraphics={Visualization.MaxFlowListGraph}
                        structure={StructureColor.MaxFlowColor}/>
                </>
            )}

            { selectedTab === 2 &&  (
                <>
                    <h1>{additionalItems[1]}</h1>
                    <AnimationManager input={generateRandomFlowNetwork()}
                        algorithm={Algorithm.EdmondsKarp} visualizationGraphics={Visualization.MaxFlowListGraph}
                        structure={StructureColor.MaxFlowColor}/>
                </>
            )}

            { selectedTab === 0 && (
                <p>This is hidden</p>
                // <>
                //     <p>
                //         The Bellman-Ford algoritmh is an algorithm, which computes the shortest from a single source vertex to all other vertices in a directed weighted graph.<br/>
                //         If a vertex in the graph is unreachable from the source it is marked as having an infinite distance between the source and itself.<br/>
                //         Even though Bellman-Ford has a worse time complexity than many other shortest path algorithms. <br/>
                //         It has the benefit of being able to handle edges with negative weights.

                //     </p>

                //     <h2>Time Complexity</h2>
                //     <h4>Best case performance</h4>
                //     <p>
                //         The best case scenario for Bellman-Ford is the case where the source vertex is connected to all other vertices and the algorithm uses the early stopping optimization strategy<br/>
                //         This case can have a running time of Θ(|E|), where E is the amount of edges in the graph:
                //     </p>

                //     <AnimationManager input={{type: "graph", data: bestExampleGraph}} algorithm={Algorithm.BellmanFordFull} visualizationGraphics={Visualization.DistListGraph} isInAbout={true}/>
                    
                //     <h4 className="v-space">Worst case performance</h4>
                //     <p>
                //         The worst case scenario for Bellman-Ford has a running time of Θ(|V||E|), V is the amount of vertices in the graph:
                //     </p>

                //     <AnimationManager input={{type: "graph", data: exampleGraph}} algorithm={Algorithm.BellmanFordFull} visualizationGraphics={Visualization.DistListGraph} isInAbout={true}/>
                    
                //     <h2 className="v-space">Space complexity</h2>
                //     <p>The space complexity for Bellman-Ford is O(|V|), where V is total amount vertices present in the graph.</p>
                    
                //     <h4>Complexity table</h4>
                //     <ComplexityTable algoType={Algo.SPath} dataType={DataStructure.Graph} name={header} best={"Θ(|E|)"} average={"Θ(|V||E|)"} worst={"Θ(|V||E|)"} memory={"O(|V|)"}/>

                //     <h4 className="v-space">References</h4>
                //     <a href="https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm" target="_blank">Wikipedia</a>
                //     <br/>
                //     <a 
                //         href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bellmanFord.ts" target="_blank">
                //         PeterWesselLindberg/Algorithm_Analysis_Tool/
                //     </a>
                // </>
            )}
        </div>
    )
}

export default MaxFlowPage