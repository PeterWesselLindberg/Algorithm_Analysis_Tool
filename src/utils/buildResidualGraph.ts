import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { ResidualNode } from "../dataStructures/ResidualNode"

const buildResidualGraph = (
    nodes: GraphNodeData[]
): ResidualNode[] | undefined => {

    // Create empty residual nodes
    const residual: ResidualNode[] =
        nodes.map(node => ({
            id: node.id,
            neighbors: []
        }))

    // Easy lookup
    const getResidual = (id: string) =>
        residual.find(node => node.id === id)!

    for (const node of nodes) {

        const from = getResidual(node.id)

        for (const edge of node.neighbors) {

            const to = getResidual(edge.to)

            if(!edge.weight) return
            // Forward edge
            from.neighbors.push({
                to: edge.to,
                capacity: edge.weight,
                flow: 0
            })

            // Reverse edge (capacity 0)
            if (!to.neighbors.some(e => e.to === node.id)) {

                to.neighbors.push({
                    to: node.id,
                    capacity: 0,
                    flow: 0
                })
            }
        }
    }

    return residual
}

export default buildResidualGraph