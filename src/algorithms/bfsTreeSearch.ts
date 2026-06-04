import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { VisualizationStep } from "../types/VisualizationStep"
import pushStep from "../utils/pushStep"
import type { AlgorithmFunction, AlgorithmInput } from "../types/algorithmtypes"
import buildBST from "../utils/buildBST"
import toId from "../utils/toId"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import buildRedBlackTree from "../utils/buildRedBlackTree"


/** Wrapper function used for red-black tree search */
export const bfsRedBlackSearch: AlgorithmFunction = (input) =>
  bfsTreeSearch(input, true)

/** Wrapper for the the breadth first search algorith */
const bfsTreeSearch = (input: AlgorithmInput, isRedBlack: boolean = false) => {
  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []

  const values = input.values
  const target = input.target
  let root = undefined

  if (values.length === 0) return steps

  // Build tree
  if (!isRedBlack) {
    root = buildBST(values)
  }
  else {
    root = buildRedBlackTree(values)
  }

  if (root === undefined) {return []}

  pushStep(steps, {
    tree: root,
    activeIds: [root.id],
  })
  
  // Search only
  bfsTreeSearchCore(root, target, steps)

  return steps
}

/** Main function for bfs search of a tree */
const bfsTreeSearchCore = (
  root: TreeNodeData | RBTreeNodeData,
  target: number,
  steps: VisualizationStep[]
): TreeNodeData | null => {

  const queue: TreeNodeData[] | RBTreeNodeData[] = [root]
  const visitedIds: string[] = []

  while (queue.length > 0) {

    const current = queue.shift()!
    
    visitedIds.push(toId(current.value))

    // Visit node
    pushStep(steps, {
      tree: root,
      activeIds: [current.id],
      visitedIds: [...visitedIds],
      target
    })

    // Found target
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

    // Add children to queue
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

  // Target not found
  pushStep(steps, {
    tree: root,
    message: `${target} not found`,
    visitedIds: [...visitedIds],
    target
  })

  return null
}

export default bfsTreeSearch

