import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomGraph from "../randGen/generateRandomGraph"
import { addToList, oneItem } from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { GraphData } from "../dataStructures/GraphData"
import Algo from "../types/algoType"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"

const DijkstrasPage = () => {

    const items: string[] = addToList(oneItem, [
        "Shortest path between two nodes", "Shortest path for full graph"
        ])

    const header: string = "Dijkstra's shortest path"
        
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const nodes: GraphNodeData[] = [
        {id: "0", value: 0, x: 400, y: 70, neighbors: [{to: "1", weight:4}, {to: "2", weight:2}]},
        {id: "1", value: 1, x: 571, y: 194, neighbors: [{to: "2", weight:1}, {to: "3", weight:5}]},
        {id: "2", value: 2, x: 505, y: 395, neighbors: [{to: "3", weight:8}, {to: "4", weight:10}]},
        {id: "3", value: 3, x: 294, y: 395, neighbors: [{to: "4", weight:2}]},
        {id: "4", value: 4, x: 228, y: 194, neighbors: [{to: "3", weight:2}]}
    ]

    const exampleGraph: GraphData = {nodes, directed: false}

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }
    
    return (
        <div>
            <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>{header}</h1>
            
            { selectedTab === 1 &&  (
                <>      
                    <AnimationManager input={generateRandomGraph(5, true, true)} 
                        algorithm={Algorithm.DijkstrasRand} visualizationGraphics={Visualization.DistListGraph}
                        structure={StructureColor.ShortestPathColor} />
                </>
            )}

            { selectedTab === 2 &&  (
                <>  
                    <AnimationManager input={generateRandomGraph(5, true, true)}
                        algorithm={Algorithm.DijkstrasFull} visualizationGraphics={Visualization.DistListGraph}
                        structure={StructureColor.ShortestPathColor} />
                </>
            )}

            {selectedTab === 0 && (
                <>
                    <p>
                        Dijkstra's algorithm is an algorithm, which computes the shortest path from a single source vertex to all other vertices in a undirected weighted graph.<br/>
                        If a vertex in the graph is unreachable from the source it is marked as having an infinite distance between the source and itself.<br/>
                    </p>

                    <h2>Time Complexity</h2>
                    <p>
                        The time complexity for Dijkstra's algorithm is O((V + E) × log(V)), where E is the amount of edges in the graph and V is the amount of vertices in the graph:
                    </p>

                    <AnimationManager input={{type: "graph", data: exampleGraph}} algorithm={Algorithm.DijkstrasFull} visualizationGraphics={Visualization.DistListGraph} isInAbout={true}/>
                    
                    <h2 className="v-space">Space complexity</h2>
                    <p>The space complexity for Dijkstra's algorithm is O(V + E).</p>
                    
                    <h4>Complexity table</h4>
                    <ComplexityTable algoType={Algo.SPath} dataType={DataStructure.Graph} name={header} best={"Θ((V + E) × log(V))"} average={"Θ((V + E) × log(V))"} worst={"Θ((V + E) × log(V))"} memory={"O(V + E)"}/>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/dijkstrasAlgorithm.ts" target="_blank">
                        PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>
                </>
            )}

        </div>
    )
}

export default DijkstrasPage