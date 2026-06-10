import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"

interface TreeEdgesProps {
  node: RBTreeNodeData | TreeNodeData | null
  activeEdgeIds?: string[]
}

const TreeEdges = ({ node, activeEdgeIds = []}: TreeEdgesProps) => {
  if (!node) return null

  return (
    <>
      {node.children.map((child) => {

        if (child === null) return null

        const edgeId = `${node.id}->${child.id}`

        return (
          <g key={edgeId}>
            <line
              x1={node.x}
              y1={node.y}
              x2={child.x}
              y2={child.y}
              stroke={activeEdgeIds.includes(edgeId) ? "orange" : "grey"}
              strokeWidth={activeEdgeIds.includes(edgeId) ? 4 : 2}
              style={{
                transition: "stroke 0.2s ease"
              }}
            />

            {/* Recurse */}
            <TreeEdges
              node={child}
              activeEdgeIds={activeEdgeIds}
            />
          </g>
        )
      })}
    </>
  )
}

export default TreeEdges