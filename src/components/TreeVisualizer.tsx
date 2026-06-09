import TreeNodes from "./TreeNodes"
import TreeEdges from "./TreeEdges"
import { useMemo } from "react"
import type { VisualizationStep } from "../types/VisualizationStep"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import type { TreeNodeDataNew } from "../dataStructures/TreeNodedataNew"

interface TreeVisualizerProps {
  step: VisualizationStep
  tree: TreeNodeDataNew | RBTreeNodeData | null
  numbers: number[]
  isHeap?: boolean
}



const TreeVisualizer = ({
  step,
  tree,
  numbers,
  isHeap = false
}: TreeVisualizerProps) => {

  const height = useMemo(() => {
    const getDepth = (
      node: TreeNodeDataNew | RBTreeNodeData | null
    ): number => {
      if (!node) return 0

      // NEW TREE TYPE (tuple children)
      if ("children" in node && Array.isArray(node.children) && node.children.length === 2) {
        return 1 + Math.max(
          getDepth(node.children[0]),
          getDepth(node.children[1])
        )
      }

      // OLD TREE TYPES (array children)
      const children = (node as RBTreeNodeData).children

      if (!children || children.length === 0) return 1

      return 1 + Math.max(
        getDepth(children?.[0] ?? null),
        getDepth(children?.[1] ?? null)
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
        isHeap={isHeap}
      />

      <TreeNodes
        node={tree}
        numbers={numbers}
        activeIds={step.activeIds}
        compareIds={step.compareIds}
        sortedIds={step.sortedIds}

        deletingIds={step.deletingIds}
        replacementIds={step.replacementIds}
        isHeap={isHeap}
      />
    </svg>
  )
}

export default TreeVisualizer