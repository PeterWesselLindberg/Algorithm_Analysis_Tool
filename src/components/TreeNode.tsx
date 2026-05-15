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

      {/* CHILDREN */}
      {node.children &&
        node.children.length > 0 && (

        <div
          style={{
            display: "flex",
            gap: "4rem",
            marginTop: "2rem"
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