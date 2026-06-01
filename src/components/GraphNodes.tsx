import type { GraphData } from "../dataStructures/GraphData"

interface GraphNodesProps {
    graph?: GraphData
    activeIds?: string[]
    compareIds?: string[]
    sortedIds?: string[]
    shortestPathIds?: string[]
}

const GraphNodes = ({graph, activeIds = [], compareIds = [], sortedIds = [], shortestPathIds = []}: GraphNodesProps) => {
    if (!graph) return null
    return (
        <>
        {graph.nodes.map(node => {

            let fill = "#0d6efd"

            if (shortestPathIds.includes(node.id)) {
                fill = "#198754"
            }
            
            else if (sortedIds.includes(node.id)) {
                fill = "#198754"
            }
            
            else if (activeIds.includes(node.id)) {
                fill = "#ffc107"
            }
            
            else if (compareIds.includes(node.id)) {
                fill = "#dc3545"
            }

            return (
            <g key={node.id}>

                <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={fill}
                />

                <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dy={5}
                    fill="white"
                >
                {node.value}
                </text>

            </g>
            )
        })}
        </>
    )
}

export default GraphNodes