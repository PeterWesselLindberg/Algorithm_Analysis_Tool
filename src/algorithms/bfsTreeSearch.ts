import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { VisualizationStep } from "../types/VisualizationStep"
import pushStep from "../utils/pushStep"
import type { AlgorithmFunction } from "../types/algorithmtypes"
import buildBST from "../utils/buildBST"
import toId from "../utils/toId"

const bfsTreeSearch: AlgorithmFunction = (input) => {
  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []

  const values = input.values
  const target = input.target

  if (values.length === 0) return steps

  // BUILD TREE
  const root = buildBST(values)
  if (root === undefined) {return []}

  pushStep(steps, {
    tree: root,
    activeIds: [root.id],
  })

  
  // SEARCH ONLY
  bfsTreeSearchCore(root, target, steps)

  return steps
}

const bfsTreeSearchCore = (
  root: TreeNodeData,
  target: number,
  steps: VisualizationStep[]
): TreeNodeData | null => {

  const queue: TreeNodeData[] = [root]
  const visitedIds: string[] = []

  while (queue.length > 0) {

    const current = queue.shift()!
    
    visitedIds.push(toId(current.value))

    // VISIT NODE
    pushStep(steps, {
      tree: root,
      activeIds: [current.id],
      visitedIds: [...visitedIds],

      target
    })

    // FOUND
    if (current.value === target) {
      pushStep(steps, {
        tree: root,
        activeIds: [current.id],
        message: `Found ${target}`,
        visitedIds: [...visitedIds],

        target
      })
      return current
    }

    // ADD CHILDREN TO QUEUE
    if (current.children) {
      for (const child of current.children) {

        if (!child) continue

        pushStep(steps, {
          tree: root,
          activeIds: [current.id, child.id],
          activeEdgeIds: [`${current.id}->${child.id}`],
          visitedIds: [...visitedIds],

          target
        })

        queue.push(child)
      }
    }
  }

  // NOT FOUND
  pushStep(steps, {
    tree: root,
    message: `${target} not found`,
    visitedIds: [...visitedIds],

    target
  })

  return null
}

export default bfsTreeSearch

