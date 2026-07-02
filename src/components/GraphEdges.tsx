import type { GraphData } from "../dataStructures/GraphData"
import getEdgeLabel from "../utils/getEdgeLabel"

interface GraphEdgesProps {
    graph?: GraphData
    activeEdgeIds?: string[]
    mstEdgeIds?: string[]
    shortestPathEdgeIds?: string[]
    isMaxFlow?: boolean
}

const GraphEdges = ({graph, activeEdgeIds = [], mstEdgeIds = [], shortestPathEdgeIds = [], isMaxFlow = false}: GraphEdgesProps) => {

    if (!graph) return null
    return (
        <>
            <defs>
                <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="8"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path
                    d="M0,0 L0,6 L9,3 z"
                    fill="gray"
                    />
                </marker>
            </defs>
            
            {graph.nodes.flatMap(node =>
                
                node.neighbors?.map(edge => {

                const neighbor = graph.nodes.find(n => n.id === edge.to)

                if (!neighbor) return null

                const edgeId = `${node.id}->${neighbor.id}`

                const isMST = mstEdgeIds.includes(edgeId)
                const isActive = activeEdgeIds.includes(edgeId)
                const isShortestPath = shortestPathEdgeIds.includes(edgeId)

                let stroke = "grey"
                let strokeWidth = 3

                if (isMST) {
                    stroke = "lime"
                    strokeWidth = 4
                }

                if (isActive) {
                    stroke = isMST
                        ? "#00ff88"
                        : "orange"

                    strokeWidth = 5
                }

                if (isShortestPath) {
                    stroke = "#00ff88"
                    strokeWidth = 4
                }
                
                // Direction
                const dx = neighbor.x - node.x

                const dy = neighbor.y - node.y

                // Angle
                const angle = Math.atan2(dy, dx)

                // Shorten edge so arrow stops at node border
                const nodeRadius = 20

                const endX = neighbor.x - Math.cos(angle) * nodeRadius

                const endY = neighbor.y - Math.sin(angle) * nodeRadius
                
                return (
                    
                    <g key={`${node.id}-${neighbor.id}`}>

                    <line
                        x1={node.x}
                        y1={node.y}
                        x2={endX}
                        y2={endY}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        markerEnd={graph.directed ? "url(#arrow)" : undefined}
                    />

                    {edge.weight !== undefined && (
                        <text
                            className="graph-text"
                            x={(node.x + neighbor.x) / 2}
                            y={(node.y + neighbor.y) / 2}
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                        >
                            {isMaxFlow ? getEdgeLabel(edge) : edge.weight}
                        </text>
                    )}

                    </g>
                )})
            )}
        </>
    )
}

export default GraphEdges