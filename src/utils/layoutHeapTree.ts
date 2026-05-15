import type { TreeNodeData } from "../dataStructures/TreeNodedata"

const layoutHeapTree = (
  node?: TreeNodeData,
  index = 0,
  depth = 0,
  x = 0,
  spacing = 120
): TreeNodeData | undefined => {
  if (!node) return undefined

  const leftIndex = 2 * index + 1
  const rightIndex = 2 * index + 2

  const left =
    node.children?.[0]
      ? layoutHeapTree(node.children[0], leftIndex, depth + 1, x - spacing, spacing / 1.5)
      : undefined

  const right =
    node.children?.[1]
      ? layoutHeapTree(node.children[1], rightIndex, depth + 1, x + spacing, spacing / 1.5)
      : undefined

  return {
    ...node,
    x,
    y: depth * 80,
    children: [left, right].filter(Boolean) as TreeNodeData[]
  }
}

export default layoutHeapTree