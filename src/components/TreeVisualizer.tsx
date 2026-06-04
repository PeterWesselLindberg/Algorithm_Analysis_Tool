import type { TreeNodeData }
from "../dataStructures/TreeNodedata"
import TreeNodes from "./TreeNodes"
import TreeEdges from "./TreeEdges"
import { useMemo } from "react"
import type { VisualizationStep } from "../types/VisualizationStep"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"

interface TreeVisualizerProps {
  step: VisualizationStep
  tree?: TreeNodeData | RBTreeNodeData
  numbers: number[]
}



const TreeVisualizer = ({
  step,
  tree,
  numbers
}: TreeVisualizerProps) => {

  const height = useMemo(() => {
    const getDepth = (node?: TreeNodeData | RBTreeNodeData): number => {
      if (!node) return 0

      return 1 + Math.max(
        getDepth(node.children?.[0]),
        getDepth(node.children?.[1])
      )
    }

    const LEVEL_GAP = 100
    const TOP = 60
    const BOTTOM = 60

    return TOP + getDepth(tree) * LEVEL_GAP + BOTTOM
  }, [tree])

  return (
    <svg width="100%" height={height}>
      <TreeEdges
        node={tree}
        activeEdgeIds={step.activeEdgeIds}
      />

      <TreeNodes
        node={tree}
        numbers={numbers}
        activeIds={step.activeIds}
        compareIds={step.compareIds}
        sortedIds={step.sortedIds}

        deletingIds={step.deletingIds}
        replacementIds={step.replacementIds}
      />
    </svg>
  )
}

export default TreeVisualizer