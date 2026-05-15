import type { LinearData } from "../dataStructures/LinearData"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { GraphData } from "../dataStructures/GraphData"
import type { GridData } from "../dataStructures/GridData"

export type VisualizationStep = {

  // VISUAL STRUCTURES
  linear?: LinearData

  tree?: TreeNodeData

  graph?: GraphData

  grid?: GridData

  // HIGHLIGHTS
  activeIds?: string[]

  compareIds?: string[]

  sortedIds?: string[]

  visitedIds?: string[]

  pathIds?: string[]
}