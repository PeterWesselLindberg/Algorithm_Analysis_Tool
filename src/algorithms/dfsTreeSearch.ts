import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { VisualizationStep } from "../types/VisualizationStep"
import pushStep from "../utils/pushStep"
import type { AlgorithmFunction, AlgorithmInput } from "../types/algorithmtypes"
import buildBST from "../utils/buildBST"
import toId from "../utils/toId"

/** Wrapper function used for depth limited tree search */
export const depthLimitedSearch: AlgorithmFunction = (input) =>
  dfsTreeSearch(input, 2)

/** Wrapper for depth first tree search */
const dfsTreeSearch = (input: AlgorithmInput, depthLimit: number = -1) => {
  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []
  const values = input.values
  const target = input.target

  if (values.length === 0) return steps

  // Build tree
  const root = buildBST(values)
  if (root === undefined) {return []}

  pushStep(steps, {
    tree: root,
    activeIds: [root.id],
  })

  
  // Search only
  dfsTreeSearchCore(root, target, steps, depthLimit)

  return steps
}

/** The main function for depth first tree searach */
const dfsTreeSearchCore = (
  root: TreeNodeData,
  target: number,
  steps: VisualizationStep[],
  depthLimit: number
): TreeNodeData | null => {

  const stack: { node: TreeNodeData; depth: number }[] = [{ node: root, depth: 0 }]

  const visitedIds: string[] = []

  while (stack.length > 0) {

    const { node: current, depth } = stack.pop()!
    visitedIds.push(toId(current.value))

    // Show visit
    pushStep(steps, {
      tree: root,
      activeIds: [current.id],
      visitedIds: [...visitedIds],
      target
    })

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

    // Depth limit check for depth limited search
    if (depthLimit !== -1 && depth >= depthLimit) {
      pushStep(steps, {
        tree: root,
        activeIds: [current.id],
        visitedIds: [...visitedIds],
        message: `Depth limit reached at ${current.value}`,
        target
      })
      continue
    }

    // Push children 
    if (current.children) {
      for (let i = current.children.length - 1; i >= 0; i--) {
        const child = current.children[i]
        if (!child) continue

        pushStep(steps, {
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
  }
  

  pushStep(steps, {
    tree: root,
    message: `${target} not found`,
    visitedIds: [...visitedIds],
    target
  })

  return null
}

export default dfsTreeSearch

