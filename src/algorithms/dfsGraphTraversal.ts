import type { VisualizationStep }
from "../types/VisualizationStep"

import type { GraphData }
from "../dataStructures/GraphData"

import type { GraphNodeData }
from "../dataStructures/GraphNodeData"

import pushStep from "../utils/pushStep"
import toId from "../utils/toId"
import type { AlgorithmInput } from "../types/algorithmtypes"

const dfsGraphTraversal = (
  node: GraphNodeData,

  graph: GraphData,

  visited: Set<string>,

  visitedIds: string[],

  steps: VisualizationStep[]
) => {

  // already visited
  if (visited.has(node.id)) {
    return
  }

  // mark visited
  visited.add(node.id)

  visitedIds.push(toId(node.value))

  // VISIT NODE
  pushStep(steps, {
    graph,

    activeIds: [node.id],

    sortedIds: [...visited],

    visitedIds: [...visitedIds]
  })

  // explore neighbors
  node.neighbors?.forEach(neighborId => {

    const neighbor =
      graph.nodes.find(
        n => n.id === neighborId
      )

    if (!neighbor) return

    // animate edge traversal
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

const dfsGraphTrace = (graph: AlgorithmInput): VisualizationStep[] => {

  // DFS only supports graphs
  if (Array.isArray(graph)) {
    return []
  }
  const steps: VisualizationStep[] = []

  if (graph.nodes.length === 0) {
    return steps
  }

  const visited = new Set<string>()

  const visitedIds: string[] = []

  // start at first node
  dfsGraphTraversal(
    graph.nodes[0],

    graph,

    visited,

    visitedIds,

    steps
  )

  return steps
}

export default dfsGraphTrace
