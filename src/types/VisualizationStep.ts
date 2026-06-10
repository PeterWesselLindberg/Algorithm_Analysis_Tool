import type { LinearData } from "../dataStructures/LinearData"
import type { GraphData } from "../dataStructures/GraphData"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"

/** The values used in pushStep for the visualizations */
export type VisualizationStep = {

  // Visual structures
  linear?: LinearData

  linears?: LinearData[]

  tree: RBTreeNodeData | TreeNodeData | null

  graph?: GraphData

  message?: string

  // Highlights
  activeIds?: string[]

  compareIds?: string[]

  sortedIds?: string[]

  mstEdgeIds?: string[]

  deletingIds?: string[]

  visitedIds?: string[]

  replacementIds?: string[]

  activeEdgeIds?: string[]

  // Saved values
  
  distances?: Record<string, number> 
  
  mstEdges?: string[]

  mstWeight?: number

  target?: number

  start?: number

  shortestPathIds?: string[] 

  shortestPathEdgeIds?: string[]

}