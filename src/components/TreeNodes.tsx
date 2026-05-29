import type { TreeNodeData } from "../dataStructures/TreeNodedata"

interface TreeNodesProps {
  node?: TreeNodeData
  numbers: number[]

  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]

  deletingIds?: string[]
  replacementIds?: string[]
}

const TreeNodes = ({
  node,
  numbers,
  activeIds = [],
  compareIds = [],
  sortedIds = [],
  deletingIds = [],
  replacementIds = []
}: TreeNodesProps) => {
  if (!node) return null
  else if (node?.children === undefined) {return null}

  // const index = Number(node.id)
  // const value = numbers[index]

  let fill = "#0d6efd"

  
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
      .filter((child): child is TreeNodeData => child !== undefined)
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
export default TreeNodes