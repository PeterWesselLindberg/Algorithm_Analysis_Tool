import type { TreeNodeData }
from "../dataStructures/TreeNodedata"

import TreeNodes from "./TreeNodes"

import TreeEdges from "./TreeEdges"
import type { VisualizationStep } from "../types/VisualizationStep"

interface TreeVisualizerProps {
  step: VisualizationStep
  tree?: TreeNodeData
  numbers: number[]

  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]
}

const TreeVisualizer = ({
  step,
  tree,
  numbers

}: TreeVisualizerProps) => {

  return (
    <svg width="100%" height="500">
      <TreeEdges 
        node={tree}
        activeEdgeIds={step.activeEdgeIds}
      />
      <TreeNodes 
        node={tree}
        numbers={numbers}
        activeIds={step.activeIds}
        compareIds={step.compareIds}
        sortedIds={step.sortedIds} />
    </svg>
  )
}

export default TreeVisualizer