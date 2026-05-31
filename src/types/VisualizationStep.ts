import type { LinearData } from "../dataStructures/LinearData"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { GraphData } from "../dataStructures/GraphData"
import type { GridData } from "../dataStructures/GridData"

/** The values used in pushStep for the visualizations */
export type VisualizationStep = {

  // Visual structures
  linear?: LinearData

  linears?: LinearData[]

  tree?: TreeNodeData

  graph?: GraphData

  grid?: GridData

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

}