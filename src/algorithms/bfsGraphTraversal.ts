import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import { pushStep } from "../utils/pushStep"

/** Breadth first graph traversal */
const bfsGraphTraversal = (
    input: AlgorithmInput
): VisualizationStep[] => {

    // BFS only supports graphs
    if (input.type !== "graph") {
        return []
    }

    const graph = input.data
    const steps: VisualizationStep[] = []

    if (graph.nodes.length === 0) {
        return steps
    }

    const start = graph.nodes[0]

    const queue: GraphNodeData[] = []

    const visited = new Set<string>()

    const visitedIds: string[] = []

    // Start node
    queue.push(start)

    visited.add(start.id)

    while (queue.length > 0) {

        const current = queue.shift()

        if (!current) continue

        // Visit node
        visitedIds.push(current.value.toString())

        pushStep(steps, {
            graph,
            activeIds: [current.id],
            sortedIds: [...visited],
            visitedIds: [...visitedIds]
        })

        // Explore neighbors
        current.neighbors.forEach(edge => {

            const neighbor = graph.nodes.find(n => n.id === edge.to)

            if (!neighbor) return

            if (visited.has(neighbor.id)) {
                return
            }

            // Animate edge traversal
            pushStep(steps, {
                graph,
                activeIds: [current.id],
                activeEdgeIds: [`${current.id}->${neighbor.id}`],
                sortedIds: [...visited],
                visitedIds: [...visitedIds]
            })

            visited.add(neighbor.id)

            queue.push(neighbor)
        })
    }

    return steps
}

export default bfsGraphTraversal