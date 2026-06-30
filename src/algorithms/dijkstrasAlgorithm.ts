import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { AlgorithmInput, AlgorithmFunction } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"
import choooseRandomNodes from "../utils/chooseRandomNodes"
import buildShortestPath from "../utils/buildShortestPath"

/** Wrapper function for Dijkstra full graph traversal*/
export const dijkstraFull : AlgorithmFunction = input => dijkstra(input, false)

/** Wrapper function for Dijkstra's shortest path between two nodes*/
export const dijkstraRandom: AlgorithmFunction = input => dijkstra(input, true)

const dijkstra = (
    input: AlgorithmInput,
    limitedDist: boolean = true
): VisualizationStep[] => {

    // Dijkstras only supports graphs
    if (input.type !== "graph") return []
  
    const graph = input.data
    const steps: VisualizationStep[] = []

    if (graph.nodes.length === 0) {
        return steps
    }

    let start = graph.nodes[0]
    let target = graph.nodes[graph.nodes.length-1]
    let end = undefined
    let source = undefined

    if (limitedDist) {
        const randomNodes = choooseRandomNodes(graph)

        start = graph.nodes[randomNodes[0]]

        target = graph.nodes[randomNodes[1]]

        end = target.value
        source = start.value

        pushStep(steps, {
            graph,
            activeIds: [target.id],
            compareIds: [start.id]
        })
    }

    // Distances
    const distances: Record<string, number> = {}

    // Visited
    const visited = new Set<string>()

    // Final path storage
    const previous: Record<string, string | undefined> = {}
  
    // Initialize infinity
    graph.nodes.forEach(node => {
        distances[node.id] = Infinity
        previous[node.id] = undefined
    })

    distances[start.id] = 0

    while (visited.size < graph.nodes.length) {

        // Find closest unvisited node
        let current: GraphNodeData | undefined

        let minDistance = Infinity

        graph.nodes.forEach(node => {

            if ( !visited.has(node.id) && distances[node.id] < minDistance) {
                current = node
                minDistance = distances[node.id]
            }
        })

        if (!current) break

        const currentNode = current

        // Mark visited
        visited.add(currentNode.id)


        if (currentNode.id === target.id) {

            const {shortestPathIds, shortestPathEdgeIds} = buildShortestPath(previous, target.id)

            pushStep(steps, {
                graph,
                distances: { ...distances },
                shortestPathIds,
                shortestPathEdgeIds,
                target: end,
                start: source,
                message: !limitedDist
                    ? "Dijkstras completed"
                    : `Shortest distance from ${start.value} to ${target.value} is ${distances[target.id]}`
            })

            break
        }

        // Animation step
        pushStep(steps, {
            graph,
            activeIds: [currentNode.id],
            sortedIds: [...visited],
            distances: { ...distances },
            target: end,
            start: source
        })

        // Relax neighbors
        currentNode.neighbors.forEach(edge => {

            const neighbor = graph.nodes.find(n => n.id === edge.to)

            if (!neighbor) return

            if (visited.has(neighbor.id)) {
                return
            }

            const newDistance = distances[currentNode.id] + (edge.weight ?? 1)

            // Edge traversal animation
            pushStep(steps, {
                graph,
                activeIds: [currentNode.id],
                activeEdgeIds: [`${currentNode.id}->${neighbor.id}`],
                distances: { ...distances },
                sortedIds: [...visited],
                target: end,
                start: source
            })

            // Relaxation
            if (newDistance < distances[neighbor.id]) {

                distances[neighbor.id] = newDistance

                // Store where we came from
                previous[neighbor.id] = currentNode.id


                pushStep(steps, {
                    graph,
                    activeIds: [neighbor.id],
                    distances: { ...distances },
                    sortedIds: [...visited],
                    target: end,
                    start: source
                })
            }
        })
    }

    return steps
}

export default dijkstra