import type { AlgorithmInput }
from "../types/algorithmtypes"

import type { VisualizationStep }
from "../types/VisualizationStep"

import { pushStep } from "../utils/pushStep"

const find = (
  parent: Record<string, string>,
  nodeId: string
): string => {

  if (parent[nodeId] !== nodeId) {

    parent[nodeId] = find(parent, parent[nodeId])
  }

  return parent[nodeId]
}

const union = (
  parent: Record<string, string>,
  a: string,
  b: string
) => {

  const rootA = find(parent, a)
  const rootB = find(parent, b)

  if (rootA !== rootB) {
    parent[rootB] = rootA
  }
}

const kruskalsAlgorithm = (
  input: AlgorithmInput
): VisualizationStep[] => {

  // Kruskals can only take graphs
  if (input.type !== "graph") {
    return []
  }
  const graph = input.data
  const steps: VisualizationStep[] = []
  const mstEdgeIds: string[] = []
  const mstEdges: string[] = []
  const connectedNodes = new Set<string>()

  // Collect all edges
  const edges: {
    from: string
    to: string
    weight: number
  }[] = []

  graph.nodes.forEach(node => {

    node.neighbors.forEach(edge => {

      // Avoid duplicates in undirected graph
      if ( graph.directed || node.id < edge.to) {
        edges.push({
          from: node.id,
          to: edge.to,
          weight: edge.weight ?? 1
        })
      }
    })
  })

  // Sort by weight
  edges.sort(
    (a, b) => a.weight - b.weight
  )

  // Union-find setup
  const parent: Record<string, string> = {}

  graph.nodes.forEach(node => {
    parent[node.id] = node.id
  })

  let mstWeight = 0

  edges.forEach(edge => {

    const rootA = find(parent, edge.from)
    const rootB = find(parent, edge.to)

    // Comparison animation
    pushStep(steps, {
      graph,
      activeIds: [
        edge.from,
        edge.to
      ],

      activeEdgeIds: [
        `${edge.from}->${edge.to}`
      ],
      
      sortedIds: [...connectedNodes],
      mstEdgeIds: [...mstEdgeIds],
      mstEdges: [...mstEdges],
      mstWeight
    })

    // No cycle
    if (rootA !== rootB) {

      connectedNodes.add(edge.from)
      connectedNodes.add(edge.to)

      union(
        parent,
        edge.from,
        edge.to
      )

      mstWeight += edge.weight

      const edgeId = `${edge.from}->${edge.to}`

      mstEdgeIds.push(edgeId)

      mstEdges.push(
        `${edge.from} → ${edge.to} (${edge.weight})`
      )

      pushStep(steps, {
        graph,
        activeIds: [
          edge.from,
          edge.to
        ],

        activeEdgeIds: [
          `${edge.from}->${edge.to}`
        ],

        mstEdgeIds: [...mstEdgeIds],
        mstEdges: [...mstEdges],
        mstWeight,
        sortedIds: [...connectedNodes],
        message:
          `Added edge (${edge.from} → ${edge.to}) weight ${edge.weight}`
      })
    }
  })

  pushStep(steps, {
    graph,
    mstEdgeIds,
    mstEdges,
    mstWeight,
    sortedIds: [...connectedNodes],
    message:
      `MST total weight: ${mstWeight}`
  })

  return steps
}

export default kruskalsAlgorithm