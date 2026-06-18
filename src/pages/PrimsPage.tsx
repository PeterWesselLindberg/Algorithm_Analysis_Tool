import visualItems from "../utils/visualItems"
import { useSearchParams } from "react-router-dom"
import TopNavBar from "../components/TopNavBar"
import AnimationManager from "../components/AnimationManager"
import generateRandomGraph from "../randGen/generateRandomGraph"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { GraphData } from "../dataStructures/GraphData"
import Algo from "../types/algoType"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"

const PrimsPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const header: string = "Prim's minimum spanning tree"
    
        const nodes: GraphNodeData[] = [
                        {id: "A", value: 0, x: 400, y: 70, neighbors: [{to: "B", weight:2}, {to: "C", weight:4}]},
                        {id: "B", value: 1, x: 540, y: 137, neighbors: [{to: "C", weight:1}, {to: "D", weight:7}]},
                        {id: "C", value: 2, x: 575, y: 290, neighbors: [{to: "D", weight:3}, {to: "E", weight:5}]},
                        {id: "D", value: 3, x: 478, y: 412, neighbors: [{to: "E", weight:2}, {to: "F", weight:6}]},
                        {id: "E", value: 4, x: 321, y: 412, neighbors: [{to: "F", weight:4}, {to: "G", weight:8}]},
                        {id: "F", value: 5, x: 224, y: 290, neighbors: [{to: "G", weight:3}]},
                        {id: "G", value: 6, x: 259, y: 137, neighbors: []}
                    ]
        
        const exampleGraph: GraphData = {nodes, directed: false}

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }
    
    
    return (
        <div>
            <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>{header}</h1>
            { selectedTab === 1 && (
                <AnimationManager input={generateRandomGraph(7, true, true)} algorithm={Algorithm.Prims} visualizationGraphics={Visualization.MstListGraph}
                structure={StructureColor.MSTColor} />
            )}
            
            {selectedTab === 0 && (
                <>
                    <p>
                       Prim's algorithm is a greedy algorithm, which finds a minimum spanning tree of an undirected weighted graph.<br/>
                        If the graph is connected it finds a minimum spanning tree, which covers all vertices in the graph.<br/>
                    </p>

                    <h2>Time Complexity</h2>
                    <p>
                        The time complexity for Prim's algorithm is O(V<sup>2</sup>), when using an adjacency matrix and O((E + V) × log(V))<br/> 
                        with help of a binary heap, where E is the amount of edges in the graph and V is the amount of vertices in the graph.
                    </p>

                    <AnimationManager input={{type: "graph", data: exampleGraph}} algorithm={Algorithm.Prims} visualizationGraphics={Visualization.MstListGraph} isInAbout={true}/>
                    
                    <h2 className="v-space">Space complexity</h2>
                    <p>The space complexity for Prim's algorithm is O(V).</p>
                    
                    <h4>Complexity table</h4>
                    <ComplexityTable algoType={Algo.MinSpan} dataType={DataStructure.Graph} name={header} best={"O(v^{2})"} average={"O(v^{2})"} worst={"O(v^{2})"} memory={"O(V)"}/>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Prim%27s_algorithm" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/primsAlgorithm.ts" target="_blank">
                        PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>
                </>
            )}
        </div>
    )
}

export default PrimsPage