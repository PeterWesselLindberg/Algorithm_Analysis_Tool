import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import type { TreeNodeDataNew } from "../dataStructures/TreeNodedataNew"

interface TreeNodesProps {
  node: RBTreeNodeData | TreeNodeDataNew | null
  numbers: number[]

  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]

  deletingIds?: string[]
  replacementIds?: string[]

  isHeap?: boolean
}

const TreeNodes = ({
  node,
  numbers,
  activeIds = [],
  compareIds = [],
  sortedIds = [],
  deletingIds = [],
  replacementIds = [],
  isHeap = false,
}: TreeNodesProps) => {
  if (!node) return null
  else if (node?.children === undefined) {return null}

  let fill = "#0d6efd"

  // RB-tree override
  if ("color" in node) { 
    fill = node.color === "red" ? "#fa8072" : "rgb(95, 94, 94)"
  } 
  
  if (sortedIds.includes(node.id)) {
    fill = "#198754"
  } else if (activeIds.includes(node.id)) {
    fill = "#ffc107"
  } else if (compareIds.includes(node.id)) {
    fill = "#dc3545" 
  } else if (deletingIds.includes(node.id)) {
    fill = "#c3e211"
  } else if (replacementIds.includes(node.id)) {
    fill = "#9b1970"
  }

  if (isHeap) {
    return (
      <>
        <circle cx={node.x} cy={node.y} r={20} fill={fill} />

        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dy={5}
          fill="white"
        >
          {node.value}
        </text>

        {node.children
        .filter((child): child is RBTreeNodeData | TreeNodeDataNew => child !== null)
        .map(child => (
          <TreeNodes
            key={child.id}
            node={child}
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
            deletingIds={deletingIds}
            replacementIds={replacementIds}
          />
        ))}
      </>
    )
  }
  else {
    return (
      <>
        <circle cx={node.x} cy={node.y} r={20} fill={fill} />

        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dy={5}
          fill="white"
        >
          {node.value}
        </text>

        {node.children
        .filter((child): child is RBTreeNodeData | TreeNodeDataNew => child !== null)
        .map(child => (
          <TreeNodes
            key={child.id}
            node={child}
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
            deletingIds={deletingIds}
            replacementIds={replacementIds}
          />
        ))}
      </>
    )
  }
  
}
export default TreeNodes