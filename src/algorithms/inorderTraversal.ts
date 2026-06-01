import type { VisualizationStep } from "../types/VisualizationStep"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import pushStep from "../utils/pushStep"
import buildHeapTree from "../utils/buildHeapTree"
import toId from "../utils/toId"
import type { AlgorithmInput } from "../types/algorithmtypes"

/** Inorder tree traversal */
const inorderTraversal = (
    node: TreeNodeData | undefined,
    steps: VisualizationStep[],
    root: TreeNodeData | undefined,
    visited: string[]
) => {
    if (!node) return

    const left = node.children?.[0]
    const right = node.children?.[1]

    // Left
    if (left) {
        pushStep(steps, {
            tree: root,
            activeIds: [node.id],
            activeEdgeIds: [`${node.id}->${left.id}`],
            visitedIds: [...visited]
        })

        inorderTraversal(left, steps, root, visited)
    }

    // Visit node
    visited.push(toId(node.value))

    pushStep(steps, {
        tree: root,
        activeIds: [node.id],
        visitedIds: [...visited]
    })

    // Right
    if (right) {
        pushStep(steps, {
            tree: root,
            activeIds: [node.id],
            activeEdgeIds: [`${node.id}->${right.id}`],
            visitedIds: [...visited]  
        })

        inorderTraversal(right, steps, root, visited)
    }
}

/** The tracing of the inorder traversal */
const inorderTrace = (input: AlgorithmInput) => {

    // Inorder traversal only supports arrays
    if (input.type !== "array") {
        return []
    }

    const inputArr = input.data
    const steps: VisualizationStep[] = []
    const tree = buildHeapTree(inputArr);

    inorderTraversal(tree, steps, tree, [])

    return steps
}

export default inorderTrace