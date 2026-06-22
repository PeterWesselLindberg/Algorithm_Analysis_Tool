import type { GraphEdge } from "../dataStructures/GraphEdge"

const getEdgeLabel = (edge: GraphEdge) => {
  const flow = edge.flow ?? 0
  const cap = edge.weight ?? 0
  return `${flow}/${cap}`
}


export default getEdgeLabel