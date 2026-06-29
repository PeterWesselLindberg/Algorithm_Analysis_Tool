import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { addToList, oneItem } from "../utils/visualItems"
import { useSearchParams } from "react-router-dom"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { GraphData } from "../dataStructures/GraphData"
import generateRandomFlowNetwork from "../randGen/generateRandomFlowNetwork"
import Algo from "../types/algoType"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"
import darkImage from "../assets/max_flow_cut_dark.png";
import lightImage from "../assets/max_flow_cut_light.png";

const MaxFlowPage = () => {
    
    const additionalItems : string[] = [
        "The Ford-Fulkerson Method",
        "Edmonds-Karp's algorithm"
    ]

    const items: string[] = addToList(oneItem, additionalItems)

    const header: string = "Max flow"

    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const nodes: GraphNodeData[] = [
        {id: "0", value: 0, x: 295, y: 194, neighbors: [{to: "1", weight:6}, {to: "2", weight:7}]},
        {id: "1", value: 1, x: 505, y: 305, neighbors: [{to: "4", weight:2},{to: "2", weight:9}]},
        {id: "2", value: 2, x: 505, y: 90, neighbors: [{to: "3", weight:8}]},
        {id: "3", value: 3, x: 705, y: 90, neighbors: [{to: "5", weight:9}, {to: "1", weight:6}]},
        {id: "4", value: 4, x: 705, y: 305, neighbors: [{to: "5", weight:8}]},
        {id: "5", value: 5, x: 905, y: 194, neighbors: []}
    ]

    const exampleGraph: GraphData = {nodes, directed: true}


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
                <>
                    <h1>{header}</h1>
                    <p>
                        The max flow problem is the problem of finding the greatest rate at which we can ship materials from a source (0) to a sink (5) in a given directed non-negative weighted graph,<br/>
                        without violating any capacity constraints. There are 2 core concepts, which needs to be understood in order to understand flow networks.

                    </p>

                    <h3>Core concept 1: The capacity constraint.</h3>
                    <p>
                        The capacity constraints is a constraint, which states that for all vertices u,v in the set of all vertices V, we require that the flow allowed across any directed edge f(u,v)<br/>
                        must be between 0 and the maxmimum of the capacity c(u,v) of that edge i.e, 0 ≤ f(u,v) ≤ c(u,v).
                    </p>

                    <h3>Core concept 2: Flow conservation</h3>
                    <p>
                        Flow conservation is a property of flow networks, which states that for all vertices u in the set of all vertices V-{"{0,5}"}, we require that the amount of flow, which enters the vertex u,<br/>
                        ∑<sub>v∈V</sub> f(v,u) must be the same amount of flow which exits the vertex u, ∑<sub>v∈V</sub> f(u,v) i.e, ∑<sub>v∈V</sub> f(v,u) = ∑<sub>v∈V</sub> f(u,v).
                    </p>

                    <h3>Example flow network</h3>
                    <AnimationManager input={{type: "graph", data: exampleGraph}} algorithm={Algorithm.EdmondsKarp} visualizationGraphics={Visualization.MaxFlowListGraph} isInAbout={true} hasAnimationOverlay={false}/>

                    <h2>Max flow algorithms, core concepts</h2>
                    <p>Before getting into the algorithms we need to introduce 3 more concepts and a theorem.</p>
                    
                    <h3>Core concept 1 of max flow algorithms: Residual networks.</h3>
                    <p>
                        The residual network of a flow network is a graph used in the max flow problem algoritmhs, which shows the current flow sent through the flow network using 2 types of edges called.<br/>
                        Forward edges i.e, the remaining capacity available in the original flow direction so the flow from the source to the sink and the capacity, which have not yet been used on the edges.<br/>
                        Then there is the backwards edges i.e, the flow, which can be pushed back to free up capacity somewhere else. These edge values are often shown using a slash (/) in max flow networks,<br/>
                        where the left side of the slash are the current flow sent through the edge (the backwards edge) and the right side is the total capacity of that edge,<br/> 
                        making the remaining capacity of that edge c<sub>f</sub>(u,v) = c(u,v) - f(u,v) (the forward edge), where c<sub>f</sub>(u,v) is the remaining capacity.
                        
                    </p>

                    <h3>Core concept 2 of max flow algorithms: Augmenting paths.</h3>
                    <p>
                        An augmenting path p is a simple path from the source to the sink in the residual network.<br/>
                        We may by the definition of a residual network increase the flow of an edge of an augmenting path by c<sub>f</sub>(u,v)<br/>
                        without violating the capacity constraint of an edge in the original network.
                    </p>

                    <h3>Core concept 3 of max flow algorithms: Cuts of flow networks.</h3>
                    <p>
                        A cut of a flow network is a partition of the vertices V into 2 sets called S and T, where T = V-S, such that vertex 0 ∈ S (the source) and vertex 5 ∈ T (the sink).
                    </p>

                    <h4>Example cut:</h4>
                    <img src={lightImage} className="img img-light" alt="img" />
                    <img src={darkImage} className="img img-dark" alt="img" />

                    <h4 className="v-space">Minimum cut</h4>
                    <p>
                        The cut shown above happens to be, what is called the minimum cut, which is a cut that partitions the graph into T and S, with the edges that it cuts through having the smallest possible total capacity, 
                        when summed and only looking at the edges that goes in the forward direction (towards the sink).
                    </p>

                    <h4>The max flow min cut theorem</h4>
                    <p>
                        The max-flow min-cut theorem is a theorem, which states that the maximum amount of flow that can be sent through a flow network from the source to the sink is equal to the value of the minimum cut.<br/>
                        The minimum cut seen in the example cut above is 10 meaning that by the max-flow min-cut theorem, that the max flow should also be 10.
                    </p>

                    <h2>The Ford-Fulkerson method</h2>
                    <p>
                        The Ford-Fulkerson method is a greedy algorithm, which computes the maximum flow from the source to the sink in a flow network by iteratively finding augmenting paths in the network.<br/>
                        The algorithm then increases the flow along this path by as much as possible, so by the max capacity of the edge with the smallest capacity along the path.
                    </p>

                    <h3>Time complexity of the Ford-Fukerson method</h3>
                    <p>
                        The running time of the Ford-Fulkerson method when all edge capacities are integers is O(E×f), where E is the number of edges and f is the maximum flow.
                    </p>

                    <h3>Space complexity of the Ford-Fukerson method</h3>
                    <p>
                        The space complexity of the Ford-Fulkerson method is O(V+E).
                    </p>

                    <AnimationManager input={{type: "graph", data: exampleGraph}} algorithm={Algorithm.FordFulkerson} visualizationGraphics={Visualization.MaxFlowListGraph} isInAbout={true}/>
          
                    <h4 className="v-space">Complexity table for the Ford-Fulkerson method</h4>
                    <ComplexityTable algoType={Algo.MaxFlow} dataType={DataStructure.Graph} name={"The Ford-Fulkerson method"} best={"O(E×f)"} average={"O(E×f)"} worst={"O(E×f)"} memory={"O(V+E)"}/>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/fordFulkerson.ts" target="_blank">
                        PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>

                    <h2 className="v-space">The Edmonds-Karp algorithm</h2>
                    <p>
                       The Edmonds-Karp algorithm is an implementation of the Ford-Fulkerson method, which finds the shortest augmenting path instead of any augmenting path in the flow network.<br/>
                       The other main difference between Edmonds-Karp and Ford-Fulkerson is that Edmonds-Karp uses BFS instead of DFS to find the augmenting paths.
                    </p>

                    <h3>Time complexity of Edmonds-Karp</h3>
                    <p>
                        The running time of Edmonds-Karp's algorithm is O(V×E<sup>2</sup>), where E is the number of edges and V is the number of vertices.
                    </p>

                    <h3>Space complexity of Edmonds-Karp</h3>
                    <p>
                        The space complexity of Edmonds-Karp's algoritmh is O(V+E).
                    </p>

                    <AnimationManager input={{type: "graph", data: exampleGraph}} algorithm={Algorithm.EdmondsKarp} visualizationGraphics={Visualization.MaxFlowListGraph} isInAbout={true}/>
          
                    <h4 className="v-space">Complexity table for Edmonds-Karp's algorithm</h4>
                    <ComplexityTable algoType={Algo.MaxFlow} dataType={DataStructure.Graph} name={"Edmonds-Karp's algorithm"} best={"O(V×E^{2})"} average={"O(V×E^{2})"} worst={"O(V×E^{2})"} memory={"O(V+E)"}/>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Edmonds%E2%80%93Karp_algorithm" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/edmondsKarp.ts" target="_blank">
                        PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>

                    
                </>
            )}
        </div>
    )
}

export default MaxFlowPage