import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { VisualizationStep } from "../types/VisualizationStep"
import pushStep from "../utils/pushStep"
const insertIntoTree = (
  root: TreeNodeData,
  value: number,
  steps: VisualizationStep[]
): void => {

  const newNode: TreeNodeData = {
    id: crypto.randomUUID(),
    value,
    x: 0,
    y: 0,
    children: []
  }

  const queue: TreeNodeData[] = [root]

  while (queue.length) {

    const current = queue.shift()!

    pushStep(steps, {
      tree: root,
      activeIds: [current.id]
    })

    // LEFT SLOT
    if (!current.children?.[0]) {
      current.children = current.children ?? []
      current.children[0] = newNode

      pushStep(steps, {
        tree: root,
        activeIds: [newNode.id],
        activeEdgeIds: [`${current.id}->${newNode.id}`],
        message: `Inserted ${value}`
      })

      return
    }

    // RIGHT SLOT
    if (!current.children?.[1]) {
      current.children[1] = newNode

      pushStep(steps, {
        tree: root,
        activeIds: [newNode.id],
        activeEdgeIds: [`${current.id}->${newNode.id}`],
        message: `Inserted ${value}`
      })

      return
    }

    // keep traversing
    queue.push(current.children[0])
    queue.push(current.children[1])
  }
}
export default insertIntoTree