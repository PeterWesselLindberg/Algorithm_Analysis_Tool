import type { VisualizationStep } from "../types/VisualizationStep"
import pushStepTree from "../utils/pushStep"
import type { AlgorithmFunction, AlgorithmInput } from "../types/algorithmtypes"
import buildBST from "../utils/buildBST"
import toId from "../utils/toId"
import buildRedBlackTree from "../utils/buildRedBlackTree"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"

/** Wrapper function used for depth limited tree search */
export const depthLimitedSearch: AlgorithmFunction = (input) =>
  dfsTreeSearch(input, 2, false)

/** Wrapper function used for red-black tree search */
export const dfsRedBlackSearch: AlgorithmFunction = (input) =>
  dfsTreeSearch(input, -1, true)

/** Wrapper for depth first tree search */
const dfsTreeSearch = (input: AlgorithmInput, depthLimit: number = -1, isRedBlack: boolean = false) => {
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
  dfsTreeSearchCore(root, target, steps, depthLimit)

  return steps
}

/** The main function for depth first tree searach */
const dfsTreeSearchCore = (
  root: TreeNodeData | RBTreeNodeData,
  target: number,
  steps: VisualizationStep[],
  depthLimit: number
): TreeNodeData | RBTreeNodeData | null => {

  const stack: {node: TreeNodeData | RBTreeNodeData; depth: number}[] = [{ node: root, depth: 0 }]

  const visitedIds: string[] = []

  while (stack.length > 0) {

    const { node: current, depth } = stack.pop()!
    visitedIds.push(toId(current.value))

    // Show visit
    pushStepTree(steps, {
      tree: root,
      activeIds: [current.id],
      visitedIds: [...visitedIds],
      target
    })

    if (current.value === target) {
      pushStepTree(steps, {
        tree: root,
        activeIds: [current.id],
        message: `Found ${target}`,
        visitedIds: [...visitedIds],
        target
      })
      return current
    }

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

    // Push children 
    const children = [
      current.children[1],
      current.children[0]
    ]

    for (const child of children) {

      if (!child) continue

      pushStepTree(steps, {
        tree: root,
        activeIds: [current.id, child.id],
        activeEdgeIds: [`${current.id}->${child.id}`],
        visitedIds: [...visitedIds],
        target
      })

      stack.push({
        node: child,
        depth: depth + 1
      })
    }
  }

  pushStepTree(steps, {
    tree: root,
    message: `${target} not found`,
    visitedIds: [...visitedIds],
    target
  })

  return null
}

export default dfsTreeSearch

