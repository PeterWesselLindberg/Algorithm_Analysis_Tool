import type { AlgorithmInput } from "../types/algorithmtypes"

import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"

import choooseRandomNodes from "../utils/chooseRandomNodes"
import type { AlgorithmFunction } from "../types/algorithmtypes"
import buildShortestPath from "../utils/buildShortestPath"

/** Wrapper function for Bellman-Ford full graph traversal*/
export const bellmanFordFull: AlgorithmFunction = input => bellmanFord(input, false)

/** Wrapper function for Bellman-Ford shortest path between two nodes*/
export const bellmanFordRandom: AlgorithmFunction = input => bellmanFord(input, true)

const bellmanFord = (
  input: AlgorithmInput,
  limitedDist: boolean = true // Set to true if using distance between 2 random nodes
): VisualizationStep[] => {

  // Only graphs supported
  if (input.type !== "graph") {
    return []
  }

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
  const distances: Record<string, number> = {}

  // Final path storage
  const previous: Record<string, string | undefined> = {}
  
  // Initialize infinity
  graph.nodes.forEach(node => {
    distances[node.id] = Infinity
    previous[node.id] = undefined
  })

  distances[start.id] = 0

  const visited = new Set<string>()

  // V - 1 passes
  for (
    let i = 0;
    i < graph.nodes.length - 1;
    i++
  ) {

    let updated = false

    graph.nodes.forEach(node => {

      node.neighbors.forEach(edge => {

        const neighbor =
          graph.nodes.find(
            n => n.id === edge.to
          )

        if (!neighbor) return

        // Edge animation
        pushStep(steps, {
          graph,
          activeIds: [node.id],
          activeEdgeIds: [
            `${node.id}->${neighbor.id}`
          ],
          distances: { ...distances },
          sortedIds: [...visited],
          target: end,
          start: source
        })

        // Unreachable
        if (distances[node.id] === Infinity) {
          return
        }

        const newDistance = distances[node.id] + (edge.weight ?? 1)

        // Relax edge
        if (newDistance < distances[neighbor.id]) {

          distances[neighbor.id] = newDistance
          
          // Store shortest path parent
          previous[neighbor.id] = node.id
          
          updated = true

          visited.add(neighbor.id)

          pushStep(steps, {
            graph,
            activeIds: [neighbor.id],
            activeEdgeIds: [
              `${node.id}->${neighbor.id}`
            ],
            distances: { ...distances },
            sortedIds: [...visited],
            target: end,
            start: source
          })
        }
      })
    })

    // Optimization:
    // Stop early if no updates
    if (!updated) {
      break
    }
  }

  // Negative cycle detection
  let hasNegativeCycle = false

  graph.nodes.forEach(node => {

    node.neighbors.forEach(edge => {

      const neighbor =
        graph.nodes.find(
          n => n.id === edge.to
        )

      if (!neighbor) return

      if (
        distances[node.id] +
        (edge.weight ?? 1)
        <
        distances[neighbor.id]
      ) {
        hasNegativeCycle = true
      }
    })
  })
  
  let localShortestPathIds: string[] = []
  let localShortestPathEdgeIds: string[] = []
  if (distances[target.id] !== Infinity) {
    const {shortestPathIds, shortestPathEdgeIds} = buildShortestPath(previous, target.id)  
    localShortestPathEdgeIds = shortestPathEdgeIds
    localShortestPathIds = shortestPathIds

  }

  
  if (!limitedDist) {
    // Final step
    pushStep(steps, {
      graph,
      distances: { ...distances },
      target: end,
      start: source,
      sortedIds: [...visited],
      shortestPathEdgeIds: localShortestPathEdgeIds,
    
      message: hasNegativeCycle
        ? "Negative cycle detected"
        : limitedDist && target
            ? distances[target.id] === Infinity
              ? `No path exists from ${start.value} to ${target.value}`
              : `Shortest distance from ${start.value} to ${target.value} is ${
                distances[target.id]
              }`

        : "Bellman-Ford completed"
      })
  }
  else {
    // Final step
    pushStep(steps, {
      graph,
      distances: { ...distances },
      target: end,
      start: source,
      shortestPathEdgeIds: localShortestPathEdgeIds,
      shortestPathIds: localShortestPathIds,

      message: hasNegativeCycle
        ? "Negative cycle detected"
        : limitedDist && target
            ? distances[target.id] === Infinity
              ? `No path exists from ${start.value} to ${target.value}`
              : `Shortest distance from ${start.value} to ${target.value} is ${
                distances[target.id]
              }`

        : "Bellman-Ford completed"
    })
  }

  return steps
}

export default bellmanFord