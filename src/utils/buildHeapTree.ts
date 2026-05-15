import type { TreeNodeData } from "../dataStructures/TreeNodedata"


const buildHeapTree = (
  arr: number[],
  index = 0
): TreeNodeData | undefined => {

  if (index >= arr.length)
    return undefined

  const left =
    buildHeapTree(arr, 2 * index + 1)

  const right =
    buildHeapTree(arr, 2 * index + 2)

  return {

    id: index.toString(),

    value: arr[index],

    children:
      [left, right]
      .filter(Boolean) as TreeNodeData[]
  }
}

export default buildHeapTree