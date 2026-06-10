import type { VisualizationStep }
from "../types/VisualizationStep"

import type { GraphData }
from "../dataStructures/GraphData"

import type { GraphNodeData }
from "../dataStructures/GraphNodeData"

import { pushStep } from "../utils/pushStep"
import toId from "../utils/toId"
import type { AlgorithmInput } from "../types/algorithmtypes"

/** Depth first graph traversal */
const dfsGraphTraversal = (
  node: GraphNodeData,
  graph: GraphData,
  visited: Set<string>,
  visitedIds: string[],
  steps: VisualizationStep[]
) => {

  // Already visited
  if (visited.has(node.id)) {
    return
  }

  // Mark visited
  visited.add(node.id)

  visitedIds.push(toId(node.value))

  // Visit node
  pushStep(steps, {
    graph,
    activeIds: [node.id],
    sortedIds: [...visited],
    visitedIds: [...visitedIds]
  })

  // Explore neighbors
  node.neighbors?.forEach(edge => {

    const neighbor =
      graph.nodes.find(
        n => n.id === edge.to
      )

    if (!neighbor) return

    // Animate edge traversal
    pushStep(steps, {
      graph,
      activeIds: [node.id],

      activeEdgeIds: [
        `${node.id}->${neighbor.id}`
      ],

      sortedIds: [...visited],
      visitedIds: [...visitedIds]
    })

    dfsGraphTraversal(
      neighbor,
      graph,
      visited,
      visitedIds,
      steps
    )
  })
}

/** The tracing of the graph traversal */
const dfsGraphTrace = (input: AlgorithmInput): VisualizationStep[] => {

  // DFS only supports graphs
  if (input.type !== "graph") {
    return []
  }
  const graph = input.data
  const steps: VisualizationStep[] = []

  if (graph.nodes.length === 0) {
    return steps
  }

  const visited = new Set<string>()

  const visitedIds: string[] = []

  // Start at first node
  dfsGraphTraversal(
    graph.nodes[0],
    graph,
    visited,
    visitedIds,
    steps
  )

  // Connected check
  const isConnected =
  visited.size === graph.nodes.length

  pushStep(steps, {
    graph,
    sortedIds: [...visited],
    visitedIds: [...visitedIds],
    message: isConnected
      ? "Graph is connected"
      : "Graph is disconnected"
  })
    
  return steps
}

export default dfsGraphTrace
