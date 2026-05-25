import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { AlgorithmInput, AlgorithmFunction } from "../types/algorithmtypes"

import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"
import choooseRandomNodes from "../utils/chooseRandomNodes"

/** Wrapper function for Dijkstra full graph traversal*/
export const dijkstraFull : AlgorithmFunction = input => dijkstra(input, false)

/** Wrapper function for Dijkstra's shortest path between two nodes*/
export const dijkstraRandom: AlgorithmFunction = input => dijkstra(input, true)

const dijkstra = (
  input: AlgorithmInput,
  limitedDist: boolean = true
): VisualizationStep[] => {

  // Dijkstras only supports graphs
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

    if (limitedDist) {
        const randomNodes = choooseRandomNodes(graph)

        start =
            graph.nodes[randomNodes[0]]

        target =
            graph.nodes[randomNodes[1]]

        pushStep(steps, {
            graph,

            activeIds: [target.id],

            compareIds: [start.id]
    })
}

  // distances
  const distances: Record<string, number> = {}

  // visited
  const visited = new Set<string>()

  // initialize infinity
  graph.nodes.forEach(node => {
    distances[node.id] = Infinity
  })

  distances[start.id] = 0

  while (visited.size < graph.nodes.length) {

    // find closest unvisited node
    let current: GraphNodeData | undefined

    let minDistance = Infinity

    graph.nodes.forEach(node => {

      if (
        !visited.has(node.id) &&
        distances[node.id] < minDistance
      ) {

        current = node

        minDistance =
          distances[node.id]
      }
    })

    if (!current) break

    const currentNode = current

    // mark visited
    visited.add(currentNode.id)


    if (currentNode.id === target.id) {

    pushStep(steps, {
      graph,

      activeIds: [start.id],

      compareIds: [target.id],

      sortedIds: [...visited],

      distances: { ...distances },

      message: !limitedDist
        ? "Dijkstras completed"
        : `Shortest distance from ${start.value} to ${target.value} is ${distances[target.id]}`
    })

    break
  }

    // animation step
    pushStep(steps, {
      graph,

      activeIds: [currentNode.id],

      sortedIds: [...visited],

      distances: { ...distances }
    })

    // relax neighbors
    currentNode.neighbors.forEach(edge => {

      const neighbor =
        graph.nodes.find(
          n => n.id === edge.to
        )

      if (!neighbor) return

      if (visited.has(neighbor.id)) {
        return
      }

      const newDistance =
        distances[currentNode.id] +
        (edge.weight ?? 1)

      // edge traversal animation
      pushStep(steps, {
        graph,

        activeIds: [currentNode.id],

        activeEdgeIds: [
          `${currentNode.id}->${neighbor.id}`
        ],

        distances: { ...distances },

        sortedIds: [...visited]
      })

      // relaxation
      if (
        newDistance <
        distances[neighbor.id]
      ) {

        distances[neighbor.id] =
          newDistance

        pushStep(steps, {
          graph,

          activeIds: [neighbor.id],

          distances: { ...distances },

          sortedIds: [...visited]
        })
      }
    })
  }

  return steps
}

export default dijkstra