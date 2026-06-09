import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStepTree } from "../utils/pushStep"
import { buildHeapTree } from "../utils/buildHeapTree"
import toId from "../utils/toId"
import type { AlgorithmInput } from "../types/algorithmtypes"
import type { TreeNodeDataNew } from "../dataStructures/TreeNodedataNew"

/** Preoder tree traversal */
const preorderTraversal = (
    node: TreeNodeDataNew | null,
    steps: VisualizationStep[],
    root: TreeNodeDataNew | null,
    visited: string[]
) => {
    if (!node) return

    const left = node.children[0]
    const right = node.children[1]

    // Visit node
    visited.push(toId(node.value))

    pushStepTree(steps, {
        tree: root,
        activeIds: [node.id],
        visitedIds: [...visited]
    })

    // Left
    if (left) {
        pushStepTree(steps, {
            tree: root,
            activeIds: [node.id],
            activeEdgeIds: [`${node.id}->${left.id}`],
            visitedIds: [...visited]
        })

        preorderTraversal(left, steps, root, visited)
    }

    // Right
    if (right) {
        pushStepTree(steps, {
            tree: root,
            activeIds: [node.id],
            activeEdgeIds: [`${node.id}->${right.id}`],
            visitedIds: [...visited]  
        })

        preorderTraversal(right, steps, root, visited)
    }

}

/** Tracing of preorder traversal */
const preorderTrace = (input: AlgorithmInput) => {
    
    // Preorder traversal only supports arrays
    if (input.type !== "array") {
        return []
    }
    
    const inputArr = input.data
    const steps: VisualizationStep[] = []
    const tree = buildHeapTree(inputArr);

    preorderTraversal(tree, steps, tree, [])

    return steps
}

export default preorderTrace