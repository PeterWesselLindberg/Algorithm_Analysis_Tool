import type { TreeNodeData }
from "../dataStructures/TreeNodedata"

import TreeNode
from "./TreeNode"

interface TreeVisualizerProps {

  tree?: TreeNodeData

  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]
}

const TreeVisualizer = ({

  tree,

  activeIds = [],
  compareIds = [],
  sortedIds = []

}: TreeVisualizerProps) => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem"
      }}
    >

      <TreeNode
        node={tree}

        activeIds={activeIds}
        compareIds={compareIds}
        sortedIds={sortedIds}
      />

    </div>
  )
}

export default TreeVisualizer