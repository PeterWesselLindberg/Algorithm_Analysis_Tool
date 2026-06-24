import type { GraphData } from "../dataStructures/GraphData"
import type { ResidualNode } from "../dataStructures/ResidualNode"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"

const bfsEdmondsKarp = (
    source: string,
    sink: string,
    nodeMap: Map<string, ResidualNode>,
    parent: Map<string, string>,
    graph: GraphData,
    steps: VisualizationStep[]
): boolean => {

    const visited = new Set<string>()
    const queue: string[] = [source]

    visited.add(source)

    while (queue.length > 0) {

        const current = queue.shift()!
        const node = nodeMap.get(current)!

        for (const edge of node.neighbors) {


            const residualCapacity = edge.capacity - edge.flow

            if (residualCapacity > 0 && !visited.has(edge.to)) {
                visited.add(edge.to)

                pushStep(steps, {
                    graph: structuredClone(graph),
                    visitedIds: [...visited],
                    activeIds: [edge.to],
                    activeEdgeIds: [`${current}->${edge.to}`],
                    message: `Visited ${edge.to}`
                })

                parent.set(edge.to, current)

                if (edge.to === sink) {
                    return true
                }

                queue.push(edge.to)

                pushStep(steps, {
                    graph: structuredClone(graph),
                    visitedIds: [...visited],
                    activeIds: [edge.to],
                    message: `${edge.to} added to BFS queue`
                })
            }
        }
    }

    return false
}

export default bfsEdmondsKarp