import type { TreeNodeData }
from "../dataStructures/TreeNodedata"

import TreeNodes from "./TreeNodes"

import TreeEdges from "./TreeEdges"

interface TreeVisualizerProps {

  tree?: TreeNodeData
  numbers: number[]

  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]
}

const TreeVisualizer = ({

  tree,
  numbers,
  activeIds = [],
  compareIds = [],
  sortedIds = []

}: TreeVisualizerProps) => {

  return (
    <svg width="100%" height="500">
      <TreeEdges node={tree} />
      <TreeNodes 
        node={tree}
        numbers={numbers}
        activeIds={activeIds}
        compareIds={compareIds}
        sortedIds={sortedIds} />
    </svg>
  )
}

export default TreeVisualizer