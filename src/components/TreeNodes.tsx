import type { TreeNodeData } from "../dataStructures/TreeNodedata"

interface TreeNodesProps {
  node?: TreeNodeData
  numbers: number[]

  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]
}

const TreeNodes = ({
  node,
  numbers,
  activeIds = [],
  compareIds = [],
  sortedIds = []
}: TreeNodesProps) => {
  if (!node) return null
  else if (node?.children === undefined) {return null}

  const index = Number(node.id)
  const value = numbers[index]

  let fill = "#0d6efd"

  if (sortedIds.includes(node.id)) {
    fill = "#198754"
  } else if (activeIds.includes(node.id)) {
    fill = "#ffc107"
  } else if (compareIds.includes(node.id)) {
    fill = "#dc3545"
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
        {value}
      </text>

      {node.children.map(child => (
        <TreeNodes
          key={child.id}
          node={child}
          numbers={numbers}
          activeIds={activeIds}
          compareIds={compareIds}
          sortedIds={sortedIds}
        />
      ))}
    </>
  )
}
export default TreeNodes