import type { AlgorithmFunction } from "../types/algorithmtypes"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"
import buildBST from "../utils/buildBST"
import layoutTree from "../utils/layoutTree"


const extractValues = (node?: TreeNodeData): number[] => {
  if (!node) return []

  return [
    node.value,
    ...(node.children?.[0] ? extractValues(node.children[0]) : []),
    ...(node.children?.[1] ? extractValues(node.children[1]) : [])
  ]
}

const bstDelete: AlgorithmFunction = (input) => {

  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []

  const root = buildBST(input.values)
  const target = input.target

  if (!root) return []

  layoutTree(root)

  pushStep(steps, {
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

    pushStep(steps, {
      tree: structuredClone(newRoot),
      message: `Deleted ${target}`,
      target
   })
  }

  return steps
}

const deleteNode = (
  visualRoot: TreeNodeData,
  node: TreeNodeData | undefined,
  target: number,
  steps: VisualizationStep[]
): TreeNodeData | undefined => {

  if (!node) return undefined

  // VISIT NODE
  pushStep(steps, {
    tree: structuredClone(visualRoot),
    activeIds: [node.id],
    message: `Checking ${node.value}`,
    target
  })

  // GO LEFT
  if (target < node.value) {

    const child = node.children?.[0]

    if (child) {
      pushStep(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [node.id, child.id],
        activeEdgeIds: [`${node.id}->${child.id}`],
        target
      })
    }

    if (
      child &&
      child.value === target &&
      !child.children?.[0] &&
      !child.children?.[1]
    ) {

      // VISIT NODE
      pushStep(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [child.id],
        message: `Checking ${child.value}`,
        target
      })

      // FOUND NODE
      pushStep(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [child.id],
        message: `Found ${target} for deletion`,
        target
      })

      pushStep(steps, {
        tree: structuredClone(visualRoot),
        deletingIds: [child.id],
        message: `Deleting leaf node ${child.value}`,
        target
      })

      // rebuild strategy for edge case
      const newValues = extractValues(node).filter(v => v !== target)
      const rebuilt = buildBST(newValues)

      if (!rebuilt) return undefined
      layoutTree(rebuilt)

      

      return rebuilt
    }


    // normal recursion
    const result = deleteNode(visualRoot, child, target, steps)

    if (result) {
      node.children![0] = result
    } else {
      node.children!.splice(0, 1)
    }

    return node
  }

  // GO RIGHT
  if (target > node.value) {

    const child = node.children?.[1]

    if (child) {
      pushStep(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [node.id, child.id],
        activeEdgeIds: [`${node.id}->${child.id}`],
        target
      })
    }

    const result = deleteNode(visualRoot, node.children?.[1], target, steps)

    if (result) {
      node.children![1] = result
    } else {
      node.children!.splice(1, 1)
    }

    return node
  }

  // FOUND NODE

  pushStep(steps, {
    tree: structuredClone(visualRoot),
    activeIds: [node.id],
    message: `Found ${target} for deletion`,
    target
  })

  // CASE 1: LEAF
  if (!node.children?.[0] && !node.children?.[1]) {

  pushStep(steps, {
    tree: structuredClone(visualRoot),
    deletingIds: [node.id],
    message: `Deleting leaf node ${node.value}`,
    target
  })

  return undefined
}

  // CASE 2: ONLY RIGHT CHILD
  if (!node.children?.[0]) {

    const child = node.children?.[1]

    pushStep(steps, {
      tree: structuredClone(visualRoot),
      deletingIds: [node.id],
      replacementIds: [child!.id],
      message: `Replacing ${node.value} with right child`,
      target
    })   

    return child
  }

  // CASE 3: ONLY LEFT CHILD
  if (!node.children?.[1]) {

    const child = node.children?.[0]

    pushStep(steps, {
      tree: structuredClone(visualRoot),
      deletingIds: [node.id],
      replacementIds: [child!.id],
      message: `Replacing ${node.value} with left child`,
      target
    })

    return child
  }

  // CASE 4: TWO CHILDREN

  const successor = findMin(node.children[1])

  // STEP 1: highlight node + successor
  pushStep(steps, {
    tree: structuredClone(visualRoot),
    activeIds: [node.id, successor.id],
    message: `Found successor ${successor.value}`,
    activeEdgeIds: [`${node.id}->${successor.id}`],
    target
  })

  // STEP 2: mark node as being replaced
  pushStep(steps, {
    tree: structuredClone(visualRoot),
    deletingIds: [node.id],
    replacementIds: [successor.id],
    message: `Replacing ${node.value} with ${successor.value}`,
    target
  })

  node.value = successor.value

  // STEP 3: replace values
  pushStep(steps, {
    tree: structuredClone(visualRoot),
    replacementIds: [node.id],
    message: `Value updated to ${successor.value}`,
    target
  })

  const result = deleteNode(
    visualRoot,
    node.children[1],
    successor.value,
    steps
  )

  if (result) {
    node.children![1] = result
  } else {
    node.children!.splice(1, 1)
  }

  // STEP 4: show rebalancing
  pushStep(steps, {
    tree: structuredClone(visualRoot),
    message: `Tree rebalanced after deletion`,
    replacementIds: [node.id],
    target
  })

  return node
}

const findMin = (
  node: TreeNodeData
): TreeNodeData => {

  let current = node

  while (current.children?.[0]) {
    current = current.children[0]
  }

  return current
}

export default bstDelete