import type { AlgorithmFunction } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"

import pushStepTree from "../utils/pushStep"
import buildBST from "../utils/buildBST"
import layoutTree from "../utils/layoutTree"
import type { TreeNodeDataNew } from "../dataStructures/TreeNodedataNew"

/** Function to delete a node in a binary search tree */
const bstDelete: AlgorithmFunction = (input) => {

  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []

  const root = buildBST(input.values)
  const target = input.target

  if (!root) return []

  layoutTree(root)

  pushStepTree(steps, {
    tree: structuredClone(root),
    message: "BST built",
    target
  })

  const newRoot = deleteNode(
    root,
    root,
    target,
    steps
  )

  if (newRoot) {
    layoutTree(newRoot)

    pushStepTree(steps, {
      tree: structuredClone(newRoot),
      message: `Deleted ${target}`,
      target
   })
  }

  return steps
}

const deleteNode = (
  visualRoot: TreeNodeDataNew,
  node: TreeNodeDataNew | null,
  target: number,
  steps: VisualizationStep[]
): TreeNodeDataNew | null => {

  if (!node) return null

  // Visit node
  pushStepTree(steps, {
    tree: structuredClone(visualRoot),
    activeIds: [node.id],
    message: `Checking ${node.value}`,
    target
  })

  // Go left
  if (target < node.value) {

    const child = node.children[0]

    if (child) {
      pushStepTree(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [node.id, child.id],
        activeEdgeIds: [`${node.id}->${child.id}`],
        target
      })
    }

    // Normal recursion
    const result = deleteNode(visualRoot, child, target, steps)

    node.children[0] = result

    return node
  }

  // Go right
  if (target > node.value) {

    const child = node.children[1]

    if (child) {
      pushStepTree(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [node.id, child.id],
        activeEdgeIds: [`${node.id}->${child.id}`],
        target
      })
    }

    const result = deleteNode(visualRoot, child, target, steps)

    node.children[1] = result

    return node
  }

  // Found node

  pushStepTree(steps, {
    tree: structuredClone(visualRoot),
    activeIds: [node.id],
    message: `Found ${target} for deletion`,
    target
  })

  // Case 1: Leaf
  if (!node.children[0] && !node.children[1]) {

    pushStepTree(steps, {
      tree: structuredClone(visualRoot),
      deletingIds: [node.id],
      message: `Deleting leaf node ${node.value}`,
      target
    })

    return null
  }

  // Case 2: Only right child
  if (!node.children[0]) {

    const child = node.children[1]

    pushStepTree(steps, {
      tree: structuredClone(visualRoot),
      deletingIds: [node.id],
      replacementIds: [child!.id],
      message: `Replacing ${node.value} with right child`,
      target
    })   

    return child
  }

  // Case 3: Only left child
  if (!node.children[1]) {

    const child = node.children[0]

    pushStepTree(steps, {
      tree: structuredClone(visualRoot),
      deletingIds: [node.id],
      replacementIds: [child!.id],
      message: `Replacing ${node.value} with left child`,
      target
    })

    return child
  }

  // Case 4: Two children

  const successor = findMin(node.children[1])

  // Step 1: Highlight node + successor
  pushStepTree(steps, {
    tree: structuredClone(visualRoot),
    activeIds: [node.id, successor.id],
    message: `Found successor ${successor.value}`,
    activeEdgeIds: [`${node.id}->${successor.id}`],
    target
  })

  // Step 2: Mark node as being replaced
  pushStepTree(steps, {
    tree: structuredClone(visualRoot),
    deletingIds: [node.id],
    replacementIds: [successor.id],
    message: `Replacing ${node.value} with ${successor.value}`,
    target
  })

  node.value = successor.value

  // Step 3: Replace values
  pushStepTree(steps, {
    tree: structuredClone(visualRoot),
    replacementIds: [node.id],
    message: `Value updated to ${successor.value}`,
    target
  })

  const result = deleteNode(visualRoot, node.children[1], successor.value, steps)

  node.children[1] = result

  // Step 4: Show rebalancing
  pushStepTree(steps, {
    tree: structuredClone(visualRoot),
    message: `Tree rebalanced after deletion`,
    replacementIds: [node.id],
    target
  })

  return node
}

/** Helper function to find successor */
const findMin = (
  node: TreeNodeDataNew
): TreeNodeDataNew => {

  let current = node

  while (current.children?.[0]) {
    current = current.children[0]
  }

  return current
}

export default bstDelete