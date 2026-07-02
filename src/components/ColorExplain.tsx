import StructureColor from "../types/structureColor"
import type { ColorExplainer } from "../types/structureColor"

interface ColorExplainProps {
    structure?: ColorExplainer 
}

const ColorExplain = ({structure}: ColorExplainProps)  => {
    return (
        <div>
            {structure === StructureColor.ArrColor && (
                <p className="legend-item-v-space" > 
                    Red is the current element being compared: <span className="red-square"></span>
                    Yellow is the current active element: <span className="yellow-square"></span>
                    Green is sorted elements: <span className="green-square"></span>
                </p>)
            }
            
            {structure === StructureColor.BSTColor && (
                <p className="legend-item-v-space" > 
                    Yellow is the current active node: <span className="yellow-square"></span>
                    Lime is the current node being deleted: <span className="lime-square"></span>
                    Purple is the replacement node: <span className="purple-square"></span>
                </p>)
            }

            {structure === StructureColor.MSTColor && (
                <p className="legend-item-v-space" > 
                    Yellow is the current active nodes and edge: <span className="yellow-square"></span>
                    Green are the visited node and the edges, which are a part of the minimun spanning tree: <span className="green-square"></span>
                </p>)
            }

            {structure === StructureColor.ShortestPathColor && (
                <p className="legend-item-v-space" > 
                    Red is the start node: <span className="red-square"></span>
                    Yellow is the current active nodes and edge: <span className="yellow-square"></span>
                    Green are the visited nodes and the edges, which are a part of the shortest path: <span className="green-square"></span>
                </p>)
            }
            
            {structure === StructureColor.TraversalColor && (
                <p className="legend-item-v-space" > 
                    Yellow is the current active nodes and edge: <span className="yellow-square"></span>
                    Green are the visited nodes: <span className="green-square"></span>
                </p>)
            }
            
            {structure === StructureColor.MaxFlowColor && (
                <p className="legend-item-v-space" > 
                    Yellow is the current active nodes and edge: <span className="yellow-square"></span>
                    Lime are the current edges, which are a part of the max flow <span className="lime-square"></span>
                </p>)
            }
            
            {structure === StructureColor.JustYellow && (
                <p className="legend-item-v-space" > 
                    Yellow is the current active nodes and edge: <span className="yellow-square"></span>
                </p>)
            }
          
        </div>
    )
}

export default ColorExplain