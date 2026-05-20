import type { GraphData } from "../dataStructures/GraphData"

interface GraphEdgesProps {
  graph?: GraphData
  activeEdgeIds?: string[]
}

const GraphEdges = ({graph, activeEdgeIds = []}: GraphEdgesProps) => {

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

            const neighbor =
                graph.nodes.find(
                n => n.id === edge.to
                )

            if (!neighbor) return null

            const edgeId = `${node.id}->${neighbor.id}`
            
            // direction
            const dx = neighbor.x - node.x

            const dy = neighbor.y - node.y

            // angle
            const angle =
                Math.atan2(dy, dx)

            // shorten edge so arrow
            // stops at node border
            const nodeRadius = 20

            const endX =
                neighbor.x -
                Math.cos(angle) * nodeRadius

            const endY =
                neighbor.y -
                Math.sin(angle) * nodeRadius
            
            return (
                
                <g key={`${node.id}-${neighbor.id}`}>

                <line
                    x1={node.x}
                    y1={node.y}
                    x2={endX}
                    y2={endY}
                    stroke={activeEdgeIds.includes(edgeId) ? "orange" : "grey"}
                    strokeWidth={activeEdgeIds.includes(edgeId) ? 4 : 3}
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
                        {edge.weight}
                    </text>
                )}

                </g>
            )})
        )}
        </>
    )
}

export default GraphEdges