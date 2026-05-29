import type { LinearData } from "../dataStructures/LinearData"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { GraphData } from "../dataStructures/GraphData"
import type { GridData } from "../dataStructures/GridData"

export type VisualizationStep = {

  // VISUAL STRUCTURES
  linear?: LinearData

  linears?: LinearData[]

  tree?: TreeNodeData

  graph?: GraphData

  grid?: GridData

  // HIGHLIGHTS
  activeIds?: string[]

  compareIds?: string[]

  sortedIds?: string[]

  visitedIds?: string[]

  pathIds?: string[]

  activeEdgeIds?: string[]

  deletingIds?: string[]

  replacementIds?: string[]

  message?: string

  distances?: Record<string, number> 

  mstEdgeIds?: string[]

  mstEdges?: string[]

  mstWeight?: number

  target?: number

}