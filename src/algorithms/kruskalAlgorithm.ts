import type { AlgorithmInput }
from "../types/algorithmtypes"

import type { VisualizationStep }
from "../types/VisualizationStep"

import pushStep
from "../utils/pushStep"

const find = (
  parent: Record<string, string>,
  nodeId: string
): string => {

  if (parent[nodeId] !== nodeId) {

    parent[nodeId] =
      find(parent, parent[nodeId])
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

  if (input.type !== "graph") {
    return []
  }
  const graph = input.data

  const steps: VisualizationStep[] = []

  const mstEdgeIds: string[] = []

  const mstEdges: string[] = []

  // collect all edges
  const edges: {
    from: string
    to: string
    weight: number
  }[] = []

  graph.nodes.forEach(node => {

    node.neighbors.forEach(edge => {

      // avoid duplicates in undirected graph
      if (
        graph.directed ||
        node.id < edge.to
      ) {

        edges.push({
          from: node.id,
          to: edge.to,
          weight: edge.weight ?? 1
        })
      }
    })
  })

  // sort by weight
  edges.sort(
    (a, b) => a.weight - b.weight
  )

  // union-find setup
  const parent: Record<string, string> = {}

  graph.nodes.forEach(node => {
    parent[node.id] = node.id
  })

  let mstWeight = 0

  edges.forEach(edge => {

    const rootA =
      find(parent, edge.from)

    const rootB =
      find(parent, edge.to)

    // comparison animation
    pushStep(steps, {
      graph,

      activeEdgeIds: [
        `${edge.from}->${edge.to}`
      ],

      mstEdgeIds: [...mstEdgeIds],
      
      mstEdges: [...mstEdges],

      mstWeight
    })

    // no cycle
    if (rootA !== rootB) {

      union(
        parent,
        edge.from,
        edge.to
      )

      mstWeight += edge.weight

      const edgeId =
        `${edge.from}->${edge.to}`

        mstEdgeIds.push(edgeId)

        mstEdges.push(
        `${edge.from} → ${edge.to} (${edge.weight})`
        )

      pushStep(steps, {
        graph,

        activeEdgeIds: [
          `${edge.from}->${edge.to}`
        ],

        mstEdgeIds: [...mstEdgeIds],

        mstEdges: [...mstEdges],

        mstWeight,

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

    message:
      `MST total weight: ${mstWeight}`
  })

  return steps
}

export default kruskalsAlgorithm