import type { TreeNodeData }
from "../dataStructures/TreeNodedata"

import layoutTree from "./layoutTree"

const buildBST = (
  values: number[]
): TreeNodeData | undefined => {

  if (values.length === 0) {
    return undefined
  }

  const root: TreeNodeData = {
    id: "0",
    value: values[0],
    x: 0,
    y: 0,
    children: []
  }

  for (let i = 1; i < values.length; i++) {

    insertNode(
      root,
      values[i],
      i.toString()
    )
  }

  layoutTree(root)

  return root
}

const insertNode = (
  root: TreeNodeData,
  value: number,
  id: string
) => {

  let current = root

  while (true) {

    // LEFT
    if (value < current.value) {

      if (!current.children?.[0]) {

        const newNode: TreeNodeData = {
          id,
          value,
          x: 0,
          y: 0,
          children: []
        }

        current.children =
          current.children ?? []

        current.children[0] =
          newNode

        return
      }

      current = current.children[0]
    }

    // RIGHT
    else {

      if (!current.children?.[1]) {

        const newNode: TreeNodeData = {
          id,
          value,
          x: 0,
          y: 0,
          children: []
        }

        current.children =
          current.children ?? []

        current.children[1] =
          newNode

        return
      }

      current = current.children[1]
    }
  }
}

export default buildBST