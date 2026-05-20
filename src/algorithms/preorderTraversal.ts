import type { VisualizationStep } from "../types/VisualizationStep"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import pushStep from "../utils/pushStep"
import buildHeapTree from "../utils/buildHeapTree"
import toId from "../utils/toId"
import type { AlgorithmInput } from "../types/algorithmtypes"

const preorderTraversal = (
    node: TreeNodeData | undefined,
    steps: VisualizationStep[],
    root: TreeNodeData | undefined,
    visited: string[]
) => {
    if (!node) return

    const left = node.children?.[0]
    const right = node.children?.[1]

    // VISIT NODE
    visited.push(toId(node.value))

    pushStep(steps, {
        tree: root,
        activeIds: [node.id],
        visitedIds: [...visited]
    })

    // LEFT
    if (left) {
        pushStep(steps, {
            tree: root,
            activeIds: [node.id],
            activeEdgeIds: [`${node.id}->${left.id}`],
            visitedIds: [...visited]
        })

        preorderTraversal(left, steps, root, visited)
    }

    // RIGHT
    if (right) {
        pushStep(steps, {
            tree: root,
            activeIds: [node.id],
            activeEdgeIds: [`${node.id}->${right.id}`],
            visitedIds: [...visited]  
        })

        preorderTraversal(right, steps, root, visited)
    }

}

const preorderTrace = (inputArr: AlgorithmInput) => {
    
    // preorder traversal only supports arrays
    if (!Array.isArray(inputArr)) {
        return []
    }
    const steps: VisualizationStep[] = []
    const tree = buildHeapTree(inputArr);

    preorderTraversal(tree, steps, tree, [])

    return steps
}

export default preorderTrace