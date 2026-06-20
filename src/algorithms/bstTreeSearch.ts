import type { VisualizationStep } from "../types/VisualizationStep"
import pushStepTree from "../utils/pushStep"
import type { AlgorithmFunction, AlgorithmInput } from "../types/algorithmtypes"
import buildBST from "../utils/buildBST"
import buildRedBlackTree from "../utils/buildRedBlackTree"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import toId from "../utils/toId"

/** Wrapper function used for depth limited tree search */
export const depthLimitedSearch: AlgorithmFunction = (input) =>
  bstTreeSearch(input, 2, false)

/** Wrapper function used for red-black tree search */
export const bstRedBlackSearch: AlgorithmFunction = (input) =>
  bstTreeSearch(input, -1, true)

/** Wrapper for depth first tree search */
const bstTreeSearch = (input: AlgorithmInput, depthLimit: number = -1, isRedBlack: boolean = false) => {
  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []
  const values = input.values
  const target = input.target
  let root: TreeNodeData | RBTreeNodeData | null = null

  if (values.length === 0) return steps

  // Build tree
  if (!isRedBlack) {
    root = buildBST(values)
  }
  else {
    root = buildRedBlackTree(values)
  }

  if (root === null) {return []}

  pushStepTree(steps, {
    tree: root,
    activeIds: [root.id],
    target
  })

  
  // Search only
  bstTreeSearchCore(root, target, steps, depthLimit)

  return steps
}

/** The main function for binary search tree search */

const bstTreeSearchCore = (
  root: TreeNodeData | RBTreeNodeData,
  target: number,
  steps: VisualizationStep[],
  depthLimit: number
): TreeNodeData | RBTreeNodeData | null => {

  let current: TreeNodeData | RBTreeNodeData | null = root
  let depth = 0
  const visitedIds: string[] = []

  while (current) {

    // Depth limit check for depth limited search
    if (depthLimit !== -1 && depth >= depthLimit) {
      pushStepTree(steps, {
        tree: root,
        activeIds: [current.id],
        visitedIds: [...visitedIds],
        message: `Depth limit reached at ${current.value}`,
        target
      })
      continue
    }

    visitedIds.push(toId(current.value))

    // Visit current node
    pushStepTree(steps, {
      tree: root,
      activeIds: [current.id],
      visitedIds: [...visitedIds],
      target
    })

    // Found
    if (current.value === target) {
      pushStepTree(steps, {
        tree: root,
        activeIds: [current.id],
        visitedIds: [...visitedIds],
        message: `Found ${target}`,
        target
      })

      return current
    }

    // Decide direction
    const next: TreeNodeData | RBTreeNodeData | null  =
      target < current.value
        ? current.children[0]
        : current.children[1]

    // Show comparison/traversal
    if (next) {
      pushStepTree(steps, {
        tree: root,
        activeIds: [current.id, next.id],
        activeEdgeIds: [`${current.id}->${next.id}`],
        visitedIds: [...visitedIds],
        message:
          target < current.value
            ? `${target} < ${current.value}, go left`
            : `${target} > ${current.value}, go right`,
        target
      })
    }

    current = next
  }

  pushStepTree(steps, {
    tree: root,
    visitedIds,
    message: `${target} not found`,
    target
  })

  return null
}

export default bstTreeSearch

