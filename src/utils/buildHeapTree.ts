import type { TreeNodeData } from "../dataStructures/TreeNodedata"

const buildHeapTree = (
  arr: number[],
  index = 0
): TreeNodeData | undefined => {

  const NODE_X_GAP = 30
  const TOP_PADDING = 40
  const NODE_Y_GAP = 90
  const ROOT_X = 500

  
  const build = (
    i: number,
    depth: number,
    x: number
  ): TreeNodeData | undefined => {

    if (i >= arr.length) return undefined

    const left = 2 * i + 1
    const right = 2 * i + 2

    const offset = NODE_X_GAP * Math.pow(2, Math.max(3 - depth, 0))

    const node: TreeNodeData = {
      id: i.toString(),
      x,
      y: TOP_PADDING + depth * NODE_Y_GAP,
      children: []
    }

    if (node.children === undefined) {return undefined}

    const leftNode = build(left, depth + 1, x - offset)
    const rightNode = build(right, depth + 1, x + offset)

    if (leftNode) node.children.push(leftNode)
    if (rightNode) node.children.push(rightNode)

    return node
  }

  return build(index, 0, ROOT_X)
}

export default buildHeapTree