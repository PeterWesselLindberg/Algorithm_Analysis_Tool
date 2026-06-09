import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { TreeNodeDataNew } from "../dataStructures/TreeNodedataNew"

const oldBuildHeapTree = (
  arr: number[],
  index = 0
): TreeNodeData| null => {

  const NODE_X_GAP = 30
  const TOP_PADDING = 40
  const NODE_Y_GAP = 90
  const ROOT_X = 500

  
  const build = (
    i: number,
    depth: number,
    x: number
  ): TreeNodeData| null => {

    if (i >= arr.length) return null

    const left = 2 * i + 1
    const right = 2 * i + 2

    const offset = NODE_X_GAP * Math.pow(2, Math.max(3 - depth, 0))

    const node: TreeNodeData = {
      id: i.toString(),
      x,
      y: TOP_PADDING + depth * NODE_Y_GAP,
      value: arr[i],
      children: []
    }

    if (node.children === undefined) {return null}

    const leftNode = build(left, depth + 1, x - offset)
    const rightNode = build(right, depth + 1, x + offset)

    if (leftNode) node.children.push(leftNode)
    if (rightNode) node.children.push(rightNode)

    return node
  }

  return build(index, 0, ROOT_X)
}

export const buildHeapTree = (arr: number[]): TreeNodeDataNew | null => {

  const NODE_X_GAP = 30
  const TOP_PADDING = 40
  const NODE_Y_GAP = 90
  const ROOT_X = 500

  const build = (
    i: number,
    depth: number,
    x: number
  ): TreeNodeDataNew | null => {

    if (i >= arr.length) return null

    const left = 2 * i + 1
    const right = 2 * i + 2

    const offset = NODE_X_GAP * Math.pow(2, Math.max(3 - depth, 0))

    const node: TreeNodeDataNew = {
      id: i.toString(),
      x,
      y: TOP_PADDING + depth * NODE_Y_GAP,
      value: arr[i],
      children: [null, null]   // fixed tuple
    }

    const leftNode = build(left, depth + 1, x - offset)
    const rightNode = build(right, depth + 1, x + offset)

    node.children[0] = leftNode
    node.children[1] = rightNode

    return node
  }

  return build(0, 0, ROOT_X)
}


export default oldBuildHeapTree