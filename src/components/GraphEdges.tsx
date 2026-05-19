import type { GraphData } from "../dataStructures/GraphData"

interface GraphEdgesProps {
  graph?: GraphData
  activeEdgeIds?: string[]
}

const GraphEdges = ({graph, activeEdgeIds = []}: GraphEdgesProps) => {

    if (!graph) return null
    return (
        <>
        {graph.nodes.flatMap(node =>

            node.neighbors?.map(neighborId => {

            const neighbor =
                graph.nodes.find(
                n => n.id === neighborId
                )

            if (!neighbor) return null

            const edgeId =
            `${node.id}->${neighbor.id}`


            return (
                <line
                key={edgeId}

                x1={node.x}
                y1={node.y}

                x2={neighbor.x}
                y2={neighbor.y}

                stroke={activeEdgeIds.includes(edgeId) ? "orange" : "grey"}
                strokeWidth={activeEdgeIds.includes(edgeId) ? 4 : 3}
                />
            )})
        )}
        </>
    )
}

export default GraphEdges