import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import type { TreeNodeDataNew } from "../dataStructures/TreeNodedataNew"

interface TreeEdgesProps {
  node: RBTreeNodeData | TreeNodeDataNew | null
  activeEdgeIds?: string[]
  isHeap?: boolean
}

const TreeEdges = ({ node, activeEdgeIds = [], isHeap = false}: TreeEdgesProps) => {
  if (!node) return null

  if (isHeap) {
    return (
      <>
        {node.children.filter((child): child is RBTreeNodeData | TreeNodeDataNew => child !== null).map((child) => {

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
                isHeap={isHeap}
              />
            </g>
          )
        })}
      </>
    )
  }
  else {
    return (
      <>
        {node.children.filter((child): child is RBTreeNodeData | TreeNodeDataNew => child !== null).map((child) => {

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
                isHeap={isHeap}
              />
            </g>
          )
        })}
      </>
    )
  }

  
}

export default TreeEdges