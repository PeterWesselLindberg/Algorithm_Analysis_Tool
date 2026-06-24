import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"


/** Helper function for collapsing edges to improve visual clarity */
const collapseEdges = (nodes: GraphNodeData[]): GraphNodeData[] => {

    return nodes.map(node => {

        const map = new Map<string, number>()

        for (const edge of node.neighbors) {

            const current = map.get(edge.to) ?? 0

            const weight = edge.weight ?? 1

            if (current === undefined) {
                map.set(edge.to, weight)
            } 
            else {
                // Combine the sum of the final edges into 1 edge if needed
                map.set(edge.to, current + weight)
            }
        }

        return {
            ...node,
            neighbors: Array.from(map.entries()).map(([to, weight]) => ({
                to,
                weight
            }))
        }
    })
}

const randomMinCut = (
    input: AlgorithmInput
): VisualizationStep[] => {

    if (input.type !== "graph") {
        return []
    }

    const graph = input.data
    const steps: VisualizationStep[] = []

    let bestCut = Infinity
    let bestPartition: string[][] = []
    let bestGraph: GraphNodeData[] | null = null
    let bestCombinedNodes: string[] = []
    let minCut = Infinity

    const trials = graph.nodes.length

    for (let trial = 0; trial < trials; trial++) {

        // Build contraction graph
        let nodes: GraphNodeData[] = graph.nodes.map(node => ({
            id: node.id,
            value: node.value,
            members: [node.id],
            neighbors: node.neighbors.map(edge => ({
                to: edge.to,
                weight: edge.weight ?? 1
            })),

            x: node.x,
            y: node.y
        }))

        pushStep(steps, {
            graph: { nodes: structuredClone(collapseEdges(nodes)) },
            message: `Trial ${trial + 1}`,
            mstWeight: bestCut,
            mstEdges: bestCombinedNodes,
            target: minCut
        })

        while (nodes.length > 2) {

            const randomNode =
                nodes[Math.floor(Math.random() * nodes.length)]

            const randomNeighbor =
                randomNode.neighbors[
                    Math.floor(
                        Math.random() * randomNode.neighbors.length
                    )
                ]

            const randomNeighborId = randomNeighbor.to

            const u = randomNode
            const v = nodes.find(
                n => n.id === randomNeighborId
            )

            if (!v) {
                continue
            }

            // Step 1: Show chosen edge
            pushStep(steps, {
                graph: { nodes: structuredClone(collapseEdges(nodes)) },
                activeIds: [u.id, v.id],
                activeEdgeIds: [`${u.id}->${v.id}`],
                message: `Contracting ${u.id} and ${v.id}`,
                mstWeight: bestCut,
                mstEdges: bestCombinedNodes,
                target: minCut
            })

            // Merge v into u
            u.members!.push(...v.members!)

            u.neighbors.push(
                ...v.neighbors.filter(
                    edge => edge.to !== u.id
                )
            )

            // Replace references to v with u
            nodes.forEach(node => {

                node.neighbors = node.neighbors.map(edge => ({
                    ...edge,
                    to: edge.to === v.id
                        ? u.id
                        : edge.to
                }))
            })
            

            // Remove self loops
            u.neighbors = u.neighbors.filter(
                edge => edge.to !== u.id
            )

            nodes = nodes.filter(
                node => node.id !== v.id
            )

            // Step 2: Show contracted graph
            pushStep(steps, {
                graph: { nodes: structuredClone(collapseEdges(nodes)) },
                activeIds: [u.id],
                message: `${u.id} now represents {${u.members!.join(", ")}}`,
                mstWeight: bestCut,
                mstEdges: bestCombinedNodes,
                target: minCut
            })
        }

        const cutSize =
            nodes[0].neighbors.reduce(
                (sum, edge) =>
                    sum + (edge.weight ?? 1),
                0
            )
        
        minCut = cutSize
        // Step 3: Show resulting cut
        pushStep(steps, {
            graph: { nodes: structuredClone(collapseEdges(nodes)) },
            mstWeight: bestCut,
            message: `Trial ${trial + 1} produced cut ${cutSize}`,
            mstEdges: bestCombinedNodes,
            target: minCut
        })

        if (cutSize < bestCut) {

            bestCut = cutSize

            bestPartition = [
                [...nodes[0].members!],
                [...nodes[1].members!]
            ]

            // Stores snapshot of the current contracted graph
            bestGraph = structuredClone(nodes)
            bestCombinedNodes = [`A = ${bestPartition[0].join(", ")}`, `B = ${bestPartition[1].join(", ")}`]
            
            pushStep(steps, {
                graph: { nodes: structuredClone(collapseEdges(nodes)) },
                mstWeight: bestCut,
                message: `New best cut found: ${bestCut}`,
                mstEdges: bestCombinedNodes,
                target: minCut
            })
        }
    }

    pushStep(steps, {
        graph: bestGraph
            ? { nodes: structuredClone(collapseEdges(bestGraph)) }
            : { nodes: structuredClone(graph.nodes) },

        mstWeight: bestCut,
        mstEdges: bestCombinedNodes,
        message: `Minimum cut = ${bestCut}`,
        target: minCut
    })

    return steps
}

export default randomMinCut