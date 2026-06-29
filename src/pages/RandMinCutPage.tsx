import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { GraphData } from "../dataStructures/GraphData"
import generateRandomGraph from "../randGen/generateRandomGraph"
import visualItems from "../utils/visualItems"
import Algo from "../types/algoType"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"

const RandMinCutPage = () => {
    

    const header: string = "Randomized min cut"

    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)


    const nodes: GraphNodeData[] = [
                {id: "0", value: 0, x: 400, y: 70, neighbors: [{to: "1", weight:2}]},
                {id: "1", value: 1, x: 571, y: 194, neighbors: [{to: "2", weight:5}]},
                {id: "2", value: 2, x: 505, y: 395, neighbors: [{to: "3", weight:6}]},
                {id: "3", value: 3, x: 294, y: 395, neighbors: [{to: "4", weight:4}]},
                {id: "4", value: 4, x: 228, y: 194, neighbors: [{to: "0", weight:8}]}
            ]

    const exampleGraph: GraphData = {nodes: nodes, directed: false}

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }

    
    return (
        <div>
            <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>{header}</h1>

            { selectedTab === 1 &&  (
                <>
                    <AnimationManager input={generateRandomGraph(5, true, true)}
                        algorithm={Algorithm.RMinCut} visualizationGraphics={Visualization.RandMinCutListGraph}
                        structure={StructureColor.JustYellow}/>
                </>
            )}

            { selectedTab === 0 && (
                <>
                    <p>
                        The Randomized min-cut algorithm often also called Karger's algorithm is an algorithm, which finds the minimum cut of a connected undirected graph.<br/>
                        It does this by randomly contracting 2 edges together until there is only 1 edge and 2 nodes left or it isn't possible to contract anymore edges.
                    </p>

                    <h2>Monte Carlo vs Las Vegas randomized algorithms</h2>
                    <p>
                        The randomized min cut algorithm is what is called a monte carlo randomied algorithm meaning that it is an algorithm, which does not guarantee a correct result.<br/>
                        It does however guarantee a certain amount of tries to find the corrcet min cut. Another type of randomized algorithms are Las Vegas randomized algorithms,<br/>
                        which are algorithms, that guarantee a correct result no matter how long it takes meaning that it could potentially run infinitely.
                    </p>

                    <h2>Time complexity</h2>
                    <p>
                        The running time of the randomized min cut algorithm in one execution is O(V<sup>2</sup>), where V is the number of vertices in the graph. The reasoning behind this running time is that<br/>
                        there are V-2 edge contractions doing the run of the randomized min cut, where each contraction takes up to O(V) time to update the graph. In the case where the algorithm is repeated<br/>
                        for higher accuracy the running time is O(V<sup>4</sup> log(V)).
                    </p>

                    <h2>Space complexity</h2>
                    <p>
                       The space complexity of randomized min cut is O(V+E), where E is the amount of edges in the graph.
                    </p>

                    <AnimationManager input={{type: "graph", data: exampleGraph}} algorithm={Algorithm.RMinCut} visualizationGraphics={Visualization.RandMinCutListGraph} isInAbout={true}/>

                    <h4 className="v-space">Complexity table for one execution</h4>
                    <ComplexityTable algoType={Algo.MinCut} dataType={DataStructure.Graph} name={header} best={"O(V^{2})"} average={"O(V^{2})"} worst={"O(V^{2})"} memory={"O(V+E)"}/>

                    <h4 className="v-space">Complexity table for multiple executions</h4>
                    <ComplexityTable algoType={Algo.MinCut} dataType={DataStructure.Graph} name={header} best={"O(V^{4} log(V))"} average={"O(V^{4} log(V))"} worst={"O(V^{4} log(V))"} memory={"O(V+E)"}/>

                    <h4 className="v-space">References</h4>
                    <a href="https://en.wikipedia.org/wiki/Karger%27s_algorithm" target="_blank">Wikipedia</a>
                    <br/>
                    <a 
                        href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/randMinCut.ts" target="_blank">
                        PeterWesselLindberg/Algorithm_Analysis_Tool/
                    </a>
                </>
            )}
        </div>
    )
}

export default RandMinCutPage