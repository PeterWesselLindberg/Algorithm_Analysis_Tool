import type { LinearData } from "../dataStructures/LinearData"
import type { GraphData } from "../dataStructures/GraphData"
import type { RBTreeNodeDataNew } from "../dataStructures/RBTreeNodeDataNew"
import type { TreeNodeDataNew } from "../dataStructures/TreeNodedataNew"

/** The values used in pushStep for the visualizations */
export type VisualizationStep = {

  // Visual structures
  linear?: LinearData

  linears?: LinearData[]

  tree: RBTreeNodeDataNew | TreeNodeDataNew | null

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