import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"

const layoutTree = (root: TreeNodeData | RBTreeNodeData) => {

  const WIDTH = 1200
  const TOP = 60
  const LEVEL_GAP = 100

  const dfs = (
    node: TreeNodeData | RBTreeNodeData | undefined,
    depth: number,
    left: number,
    right: number
  ) => {

    if (!node) return

    const mid = (left + right) / 2

    node.x = mid
    node.y = TOP + depth * LEVEL_GAP

    dfs(node.children?.[0], depth + 1, left, mid)
    dfs(node.children?.[1], depth + 1, mid, right)
  }

  dfs(root, 0, 0, WIDTH)
}

export default layoutTree