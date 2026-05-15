import type { TreeNodeData } from "../dataStructures/TreeNodedata"

interface TreeNodeProps {
  node?: TreeNodeData

  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]
}

const TreeNode = ({node, activeIds = [], compareIds = [], sortedIds = []} : TreeNodeProps) => {
  if (!node) return null

  let background = "#0d6efd"

  if (
    sortedIds.includes(node.id)
  ) {
    background = "#198754"
  }
  else if (
    activeIds.includes(node.id)
  ) {
    background = "#ffc107"
  }
  else if (
    compareIds.includes(node.id)
  ) {
    background = "#dc3545"
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >

      {/* NODE */}
      <div
        style={{
          width: "50px",
          height: "50px",

          borderRadius: "50%",

          background,
          color: "white",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          fontWeight: "bold"
        }}
      >
        {node.value}
      </div>


      {/* CONNECTOR LINES */}
      {node.children && node.children.length > 0 && (
        <svg
          width="100%"
          height="60"
          style={{
            display: "block",
            marginTop: "0.25rem",
            overflow: "visible"
          }}
        >
          {node.children.map((_, index, arr) => {
            const spacing = 120 // horizontal distance between children
            const totalWidth = (arr.length - 1) * spacing
            const startX = 25 // center of parent node (50px / 2)

            const childX = startX - totalWidth / 2 + index * spacing

            return (
              <line
                key={index}
                x1={startX}
                y1={0}
                x2={childX}
                y2={60}
                stroke="black"
                strokeWidth={2}
              />
            )
          })}
        </svg>
      )}

      {/* CHILDREN */}
      {node.children &&
        node.children.length > 0 && (

        <div
          style={{
            display: "flex",
            gap: "4rem",
            marginTop: "0.5rem"
          }}
        >

          {node.children.map((child) => (

            <TreeNode
              key={child.id}

              node={child}

              activeIds={activeIds}
              compareIds={compareIds}
              sortedIds={sortedIds}
            />

          ))}

        </div>
      )}

    </div>
  )
}
export default TreeNode