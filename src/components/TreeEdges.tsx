import type { TreeNodeData } from "../dataStructures/TreeNodedata"

interface Props {
  node?: TreeNodeData
}

const TreeEdges = ({ node }: Props) => {
  if (!node) return null

  return (
    <>
      {node.children?.map((child) => (
        <g key={`${node.id}-${child.id}`}>
          <line
            x1={node.x}
            y1={node.y}
            x2={child.x}
            y2={child.y}
            stroke="black"
            strokeWidth={2}
          />

          {/* recurse */}
          <TreeEdges node={child} />
        </g>
      ))}
    </>
  )
}

export default TreeEdges