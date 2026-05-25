import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { VisualizationStep } from "../types/VisualizationStep"
import pushStep from "../utils/pushStep"
import type { AlgorithmFunction } from "../types/algorithmtypes"
import buildHeapTree from "../utils/buildHeapTree"
import toId from "../utils/toId"

const dfsTreeSearch: AlgorithmFunction = (input) => {
  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []

  const values = input.values
  const target = input.target

  if (values.length === 0) return steps

  // BUILD TREE
  const root = buildHeapTree(values)
  if (root === undefined) {return []}

  pushStep(steps, {
    tree: root,
    activeIds: [root.id],
  })

  
  // SEARCH ONLY
  dfsTreeSearchCore(root, target, steps)

  return steps
}

const dfsTreeSearchCore = (
  root: TreeNodeData,
  target: number,
  steps: VisualizationStep[]
): TreeNodeData | null => {

  const stack: TreeNodeData[] = [root]
  const visitedIds: string[] = []

  while (stack.length > 0) {

    const current = stack.pop()!
    visitedIds.push(toId(current.value))

    // show visit
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

    // push children (RIGHT-FIRST OR LEFT-FIRST controls animation order)
    if (current.children) {
      for (let i = current.children.length - 1; i >= 0; i--) {
        const child = current.children[i]
        if (child) {
          pushStep(steps, {
            tree: root,
            activeIds: [current.id, child.id],
            activeEdgeIds: [`${current.id}->${child.id}`],
            visitedIds: [...visitedIds],

            target
          })

          stack.push(child)
        }
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

