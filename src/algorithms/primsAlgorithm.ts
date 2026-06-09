import type { AlgorithmInput }
from "../types/algorithmtypes"

import type { VisualizationStep }
from "../types/VisualizationStep"

import { pushStep } from "../utils/pushStep"

const primsAlgorithm = (
  input: AlgorithmInput
): VisualizationStep[] => {

  if (input.type !== "graph") return []
  
  const graph = input.data
  const steps: VisualizationStep[] = []

  if (graph.nodes.length === 0) {
    return steps
  }

  const visited = new Set<string>()
  const mstEdgeIds: string[] = []
  const mstEdges: string[] = []

  let mstWeight = 0

  const start = graph.nodes[0]

  visited.add(start.id)

  pushStep(steps, {
    graph,
    activeIds: [start.id],
    sortedIds: [...visited],
    mstEdges: [...mstEdges],
    mstWeight
  })

  while (visited.size < graph.nodes.length) 
  {

    let bestEdge:
      | {
          from: string
          to: string
          weight: number
        }
      | undefined

    // Search all candidate edges
    graph.nodes.forEach(node => {

      if (!visited.has(node.id)) {
        return
      }

      node.neighbors.forEach(edge => {

        if (visited.has(edge.to)) {
          return
        }

        const weight =edge.weight ?? 1

        // Edge comparison animation
        pushStep(steps, {
          graph,
          activeIds: [node.id],
          activeEdgeIds: [
            `${node.id}->${edge.to}`
          ],

          mstEdgeIds: [...mstEdgeIds],
          mstEdges: [...mstEdges],
          mstWeight
        })

        if (!bestEdge || weight < bestEdge.weight) 
        {
          bestEdge = {
            from: node.id,
            to: edge.to,
            weight
          }
        }
      })
    })

    if (!bestEdge) {
      break
    }

    visited.add(bestEdge.to)

    const edgeId = `${bestEdge.from}->${bestEdge.to}`

    mstEdgeIds.push(edgeId)

    mstEdges.push(
      `${bestEdge.from} → ${bestEdge.to} (${bestEdge.weight})`
    )

    mstWeight += bestEdge.weight

    // Accepted edge animation
    pushStep(steps, {
      graph,
      activeIds: [bestEdge.to],
      activeEdgeIds: [edgeId],
      mstEdgeIds: [...mstEdgeIds],
      mstEdges: [...mstEdges],
      mstWeight,
      sortedIds: [...visited],
      message:
        `Added edge (${bestEdge.from} → ${bestEdge.to}) weight ${bestEdge.weight}`
    })
  }

  // Final step
  pushStep(steps, {
    graph,
    mstEdgeIds,
    mstEdges,
    mstWeight,
    message:
      `Prim's MST total weight: ${mstWeight}`
  })

  return steps
}

export default primsAlgorithm